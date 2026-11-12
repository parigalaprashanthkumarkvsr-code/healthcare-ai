# UNIT II — Data Preprocessing and Feature Engineering in Clinical Datasets

Models inherit the quality of their inputs. In healthcare, where data is missing, inconsistently measured, and written in prose, preprocessing and feature engineering are not preliminary chores — they are where most real projects succeed or fail. This unit covers cleaning and normalization, missing data and bias, EHR and physiological feature engineering, dimensionality reduction, clinical NLP, and the ICD/CPT coding systems that turn care into computable labels.

# Chapter 9. Clinical Data Cleaning, Normalization, and Standardization

Cleaning makes data *correct*; normalization makes it *comparable*; standardization makes it *usable by models* — three different jobs that students routinely conflate.

## 9.1 Chapter objectives

1. Define data cleaning, normalization, and standardization and state how they differ.
2. Apply the core techniques to clinical examples (lab units, vitals ranges, coded fields).
3. Recognize cleaning decisions that change a model's conclusions.

## 9.2 Data cleaning

**Data cleaning** detects and corrects errors and inconsistencies so the record reflects clinical reality. Core operations in clinical datasets:

1. **De-duplication** — the same encounter entered twice; the same patient under two identifiers (entity resolution).
2. **Unit harmonization** — glucose in mg/dL vs mmol/L (factor 18); creatinine mg/dL vs µmol/L (factor 88.4). A dataset mixing units is not a dataset.
3. **Range and plausibility checks** — heart rate of 900 bpm, hemoglobin of 1.2 g/dL, a discharge date before the admission date: violations of physiology or chronology.
4. **Coding hygiene** — mapping free-text entries to standard vocabularies (LOINC for labs, RxNorm for drugs); resolving duplicate synonyms.
5. **Chronology integrity** — ordering events on a consistent timeline; fixing clock skew between systems.
6. **Copy-forward hygiene** — stale text propagated through notes is *not* corrected by automation alone; flagged values must be re-validated.

## 9.3 Normalization vs standardization

- **Normalization (min–max scaling)** rescales a feature to a bounded range, typically [0, 1]: `x' = (x − min)/(max − min)`. Used when a bounded scale is required (neural network inputs, image pixel intensities). Sensitive to outliers.
- **Standardization (z-score)** rescales to zero mean, unit variance: `z = (x − μ)/σ`. The default for most tabular ML (SVMs, PCA, regularized regression). Robust variants use median and IQR for skewed clinical labs.
- **Clinical caution:** fit scaling on *training* data only and apply the fitted parameters to validation/test data; and prefer clinically interpretable transforms (e.g., log for skewed creatinine) where they exist.

```python
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler
# RobustScaler: median/IQR — the right default for skewed lab values
scaler = RobustScaler().fit(X_train)      # fit on train ONLY (no leakage)
X_train_s = scaler.transform(X_train)
X_test_s  = scaler.transform(X_test)      # same parameters, unseen data
```

## 9.4 What cleaning changes downstream

Aggregation results (a mean computed over mixed units is meaningless), outlier detection (an unscaled extreme dominates), model performance (leakage through fitting scalers on all data), and — most subtly — clinical interpretation, because a normalized value has lost its reference range. Keep the raw value alongside the scaled one.

## 9.5 Key terms

- **Data cleaning** — detecting and correcting errors/inconsistencies in clinical data.
- **Normalization** — rescaling to a bounded range (min–max).
- **Standardization** — rescaling to zero mean, unit variance (z-score).
- **Unit harmonization** — converting all measurements to a common unit system.
- **Entity resolution** — merging records that belong to the same patient/encounter.

## 9.6 Review questions

1. Distinguish cleaning, normalization, and standardization with one clinical example each.
2. Why must a scaler be fitted on training data only?
3. Give two plausibility checks that would catch a data-entry error in vital signs.

---

# Chapter 10. Missing Values, Outliers, and Collection Bias

In clinical data, *missing* is information, *extreme* is often real, and *who got measured* is never random.

## 10.1 Chapter objectives

1. Classify missingness (MCAR, MAR, MNAR) and choose an imputation method per class.
2. Detect and handle outliers without discarding true clinical extremes.
3. Identify collection and selection bias and its impact on model fairness.

## 10.2 Missing data: three mechanisms

- **MCAR (Missing Completely At Random)** — missingness unrelated to anything observed or unobserved (a dropped network packet). Deletion is nearly unbiased.
- **MAR (Missing At Random)** — missingness explainable by *observed* variables (sicker patients get more blood draws; a test absent because the panel didn't include it).
- **MNAR (Missing Not At Random)** — missingness depends on the unobserved value itself (drug-abuse history not recorded when present; a test not ordered because the clinician already "knew"). The hardest case; imputation alone cannot fix it — model the missingness mechanism or redesign collection.

> **Clinical in practice.** The most common MNAR pattern in the EHR: *absence of a test ordered is a clinical decision.* "No creatinine recorded today" often means the team expected it to be normal. Treat "was this test ordered?" as its own feature (a missingness indicator) before imputing the value.

## 10.3 Imputation methods

| Method | How | When to use |
|---|---|---|
| Deletion (listwise) | drop incomplete rows | MCAR, tiny missing fraction |
| Mean/median/mode | fill with central value | quick baseline; shrinks variance |
| Last observation carried forward (LOCF) | fill with previous value | short gaps in dense vitals only |
| KNN imputation | fill from similar patients | moderate missingness, local structure |
| MICE (chained equations) | iterative regression per feature | MAR; the standard principled choice |
| Model-native (NaN-aware trees) | let the learner split on missingness | LightGBM/XGBoost — often the best practical choice |

Always add **missingness indicator features**; evaluate imputation by downstream task performance, not by how close imputed values look real.

## 10.4 Outliers in clinical data

An outlier is a value far from the distribution. Detection: z-score/IQR rules, isolation forests, clinical plausibility ranges. Handling — and the discipline that matters: *first ask whether it is real*. A heart rate of 220 during a documented arrhythmia is signal, not noise. Correct data-entry errors; keep physiologically plausible extremes; consider robust losses (Huber) or robust scalers; and never silently delete without documenting the rule.

## 10.5 Collection and selection bias

- **Selection bias** — the sample differs from the target population (a model trained on a tertiary hospital's sickest patients misestimates risk in primary care).
- **Measurement/collection bias** — instruments or practices differ across sites, time, or demographic groups (pulse oximetry overreading SpO₂ in darker skin — a documented, consequential example).
- **Consequences:** miscalibration on deployment populations and *unfair* error rates across subgroups (Unit V, Chapter 31).
- **Mitigations:** explicit sampling design, stratified evaluation per subgroup, site-stratified external validation, and documenting the source population in the model card.

## 10.6 Key terms

- **MCAR / MAR / MNAR** — missingness mechanisms: unrelated / explained by observed data / related to the missing value itself.
- **Imputation** — filling missing values with estimates.
- **MICE** — multiple imputation by chained equations.
- **Missingness indicator** — a binary feature recording that a value was absent.
- **Selection bias** — training sample differing from the target population.

## 10.7 Review questions

1. Classify: "a stress test missing because it was contraindicated for this patient." Which mechanism, and what does that imply?
2. Why is deleting rows with missing data dangerous in clinical datasets, even under MCAR?
3. Give a clinical example where an outlier must be kept, and one where it must be corrected.
4. How does collection bias become an *ethical* problem (preview of Unit V)?

---

# Chapter 11. Feature Engineering for EHR Data

The EHR gives you raw facts; features give the model *clinical meaning* — trajectory, rarity, comorbidity burden, and time-since-event are where prediction power lives.

## 11.1 Chapter objectives

1. Construct EHR features from demographics, codes, labs, medications, and utilization.
2. Apply windowing and aggregation to build encounter-level design matrices.
3. Recognize the leakage traps specific to EHR data.

## 11.2 Feature families

1. **Demographics/administrative:** age, sex, encoded race/ethnicity (with fairness care — Unit V), insurance, admission type (elective vs emergency), seasonality.
2. **Diagnosis/comorbidity:** indicator or count of ICD codes; curated comorbidity indices (Charlson, Elixhauser) that compress diagnoses into validated risk summaries.
3. **Labs:** latest value, min/max/mean over a window, *slope* (rate of change), count of abnormal results, **time since last measurement**, and missingness indicators.
4. **Medications:** counts, indicator of high-risk drugs, dosage features, days on drug.
5. **Utilization:** prior admissions, ED visits, length of stay so far, number of consultants — utilization history is a powerful and often under-used risk signal.
6. **Text-derived:** NLP-extracted smoking status, symptom mentions, packed codes from notes (Chapter 14).

## 11.3 Windowing: the core operation

Clinical prediction is temporal: "given the first 24 hours, predict the rest of the stay." Features are computed over **observation windows** that end *before* the prediction time:

```python
import pandas as pd
# labs: patient_id, timestamp, test, value
window = labs[(labs.timestamp < pd.Timestamp(pred_time)) &
              (labs.timestamp >= pred_time - pd.Timedelta(hours=24))]
feat = window.groupby('test')['value'].agg(['last', 'min', 'max', 'mean', 'std'])
feat['slope_cr'] = slope(window.query("test=='creatinine'"))  # rate of change
feat['miss_creatinine'] = feat.index.isin(feat.index).any()   # indicator example
```

Rules that prevent leakage: features may only use data available at prediction time; aggregates must end strictly before the outcome's observation window begins; time-zero must be defined identically in training and deployment (admission time? first abnormal vital?).

## 11.4 Leakage traps in EHR work

1. **Look-ahead leakage** — using labs drawn *because* the patient deteriorated (the draw itself is post-decision information).
2. **Target leakage** — including features that encode the label (a "sepsis" diagnosis code that was ordered *after* the sepsis bundle).
3. **Scaling/selection leakage** — fitting preprocessors or feature selection on all data.
4. **Split leakage** — multiple encounters of the same patient in train and test (split by patient, always).

## 11.5 Key terms

- **Feature engineering** — constructing model inputs that encode clinical meaning.
- **Comorbidity index** — validated summary of disease burden (Charlson, Elixhauser).
- **Observation window** — the time interval whose data is allowed into features.
- **Leakage** — any information in training features that would not be available at prediction time.
- **Slope feature** — rate of change of a repeated measurement.

## 11.6 Review questions

1. Design six features for a 48-hour readmission model from each data family in §11.2.
2. Why is "time since last creatinine" a useful feature even when the value is missing?
3. State two leakage traps unique to EHR data and the split rule that guards against the third.

---

# Chapter 12. Physiological Time-Series Features and Dimensionality Reduction

Vitals and signals are dense, irregularly sampled, and non-stationary; the feature toolkit is window statistics, variability, and morphology — and when the dimension is huge, reduction restores sanity.

## 12.1 Chapter objectives

1. Engineer features from vitals and waveforms: window statistics, variability, morphology.
2. Choose between feature-based and sequence-model representations.
3. Apply PCA and feature selection to high-dimensional clinical matrices.

## 12.2 Time-series feature families

1. **Window statistics** — mean, min, max, std, last value over trailing windows (1 h, 6 h, 24 h).
2. **Variability** — standard deviation, coefficient of variation; **heart-rate variability (HRV)** features (RMSSD, SDNN) reflecting autonomic state.
3. **Trend** — slope (linear fit), delta from baseline, time above/below a clinical threshold.
4. **Morphology (waveforms)** — ECG intervals (PR, QRS, QT), ST-segment deviation; EEG band powers (delta/theta/alpha/beta); PPG pulse features.
5. **Sampling features** — measurement frequency itself (how often this patient is being measured is clinical information).
6. **Cross-signal** — shock index (HR/SBP), pulse pressure, respiratory-rate-to-SpO₂ ratios.

## 12.3 Feature-based vs sequence models

Engineered features + gradient-boosted trees remain the strongest default on modest data: interpretable, fast, robust. **RNN/LSTM/transformer** models consume the *raw sequence* and learn their own features — better with abundant data and long horizons (Chapter 19). Practical pattern: start feature-based, escalate to sequence models when the feature approach plateaus.

## 12.4 Dimensionality reduction

High-dimensional records (thousands of lab features, codes, genomic markers) need reduction:

- **Filtering** — remove near-zero-variance and highly correlated features (|r| > 0.95); keep the clinically primary one.
- **Embedded selection** — LASSO (L1) regression zeroes out weak features; tree importances (permutation importance, not impurity) rank them.
- **PCA** — orthogonal components maximizing variance; useful for visualization and as preprocessing for k-NN/SVM; loses interpretability (a "component" is not a lab value). For sparse count data (codes), correspondence-style variants or autoencoders fit better.
- **Clinical caution:** a reduced space must not discard a feature a clinician would need to act on — interpretability is a requirement, not a nicety (Unit V).

```python
from sklearn.decomposition import PCA
from sklearn.feature_selection import SelectFromModel
from sklearn.linear_model import LassoCV
lasso = SelectFromModel(LassoCV(cv=5)).fit(X_tr, y_tr)   # embedded selection
X_sel = lasso.transform(X_tr)
pca = PCA(n_components=0.95).fit(X_sel)                 # keep 95% variance
```

## 12.5 Key terms

- **HRV (heart-rate variability)** — beat-to-beat variability features reflecting autonomic tone.
- **Morphology features** — shape descriptors of a waveform (intervals, amplitudes, band powers).
- **PCA** — linear projection maximizing retained variance.
- **LASSO** — L1-regularized regression that performs embedded feature selection.
- **Filter/embedded selection** — preprocessing filters vs selection inside model training.

## 12.6 Review questions

1. Derive six time-series features from a 24-hour heart-rate series and state the clinical meaning of two.
2. When would you choose a sequence model over engineered features, and why?
3. Why can PCA hurt a model whose features feed a clinical decision, even if variance retained is high?

---

# Chapter 13. Text Mining and NLP for Clinical Notes

Most clinical knowledge is prose; NLP turns discharge summaries and radiology reports into structured, model-ready features.

## 13.1 Chapter objectives

1. Outline the clinical NLP pipeline from raw note to structured feature.
2. Apply the core sub-tasks: section segmentation, negation, entity extraction, coding.
3. Recognize the pitfalls: abbreviations, negation, hedging, and template bloat.

## 13.2 Why clinical text is hard

Notes are written for humans, not parsers: heavy abbreviation (SOB, CAD, NSTEMI), **negation** ("no evidence of pneumonia"), **hedging** ("cannot exclude", "likely"), family-history confusion ("father had MI"), imprecise dates ("last week"), and template/copy-forward bloat. Note that a naive keyword search for "pneumonia" matches its own denial.

## 13.3 The pipeline

1. **Preprocessing** — section segmentation (History, Meds, Assessment, Plan — assertions differ by section), sentence splitting, abbreviation expansion against a lexicon.
2. **Entity extraction (NER)** — clinical concept tagging, typically via dictionaries/ontologies (**UMLS**, SNOMED CT) or modern transformer models fine-tuned on clinical text (scispaCy, clinical BERT variants).
3. **Assertion detection** — is the concept *present*, *absent*, *possible*, or *historical*? Negation algorithms (NegEx) and section context decide; this is where clinical NLP differs most from generic NLP.
4. **Relation & temporal extraction** — linking findings to anatomy and time.
5. **Structured output** — features (smoking status, CHF mention), codes (ICD auto-assignment), or summaries.

```python
# Conceptual pipeline (scispaCy-style)
import scispacy, spacy
nlp = spacy.load("en_core_sci_sm")          # clinical-domain model
doc = nlp("No evidence of pneumonia on today's CXR.")
ents = [(e.text, e.label_) for e in doc.ents]
# then: negation/assertion pass over each entity in context
```

## 13.4 Downstream uses

Auto-coding (ICD assignment from notes — a well-studied NLP benchmark), cohort identification for trials, quality measures, feature engineering (smoking status, symptom flags), report summarization, and patient-facing simplification. Modern LLMs perform extraction and summarization well but need grounding and PHI safeguards (Units III, V).

## 13.5 Key terms

- **NER (named entity recognition)** — tagging clinical concepts in text.
- **Negation/assertion detection** — deciding whether an extracted concept is present, absent, or uncertain.
- **UMLS** — the Unified Medical Language System metathesaurus linking clinical vocabularies.
- **Section segmentation** — splitting a note into its clinical sections before assertion logic.
- **Auto-coding** — assigning ICD/CPT codes from text automatically.

## 13.6 Review questions

1. Why is "no evidence of pneumonia" the canonical clinical-NLP failure case, and what fixes it?
2. Order the pipeline stages and explain why assertion detection comes after entity extraction.
3. Name two safeguards an LLM-based note summarizer needs before deployment in a hospital (preview Units III, V).

---

# Chapter 14. ICD and CPT Coding Systems

Codes are how medicine becomes data: **ICD** classifies *why* the patient was seen, **CPT** classifies *what was done* — and both are indispensable labels for healthcare ML.

## 14.1 Chapter objectives

1. Describe the structure and purpose of ICD-10/ICD-10-CM.
2. Describe CPT's structure and purpose.
3. Explain how coding systems integrate into healthcare AI, billing, and classification.

## 14.2 ICD — International Classification of Diseases

Maintained by the **WHO** (national clinical modifications like **ICD-10-CM** are maintained by national bodies, e.g., CMS/CDC in the US; ICD-11 is in adoption). Structure: alphanumeric category codes (three characters) + optional detail (up to 4–7 characters), e.g., `E11.9` = Type 2 diabetes mellitus without complications; `I21.4` = acute subendocardial myocardial infarction. Purposes: morbidity and mortality statistics, reimbursement (diagnosis-related grouping), epidemiology, and — for this course — **labels for supervised learning** and **cohorts for phenotyping**.

## 14.3 CPT — Current Procedural Terminology

Maintained by the **American Medical Association**. Five-character numeric codes describing procedures and services performed by clinicians: `99213` (established-patient office visit), `93306` (echocardiogram), `66984` (routine cataract surgery), grouped into Category I–IV (with Category I the procedures; II performance measures; III emerging tech; IV... actually: I procedures, II performance management, III emerging technology, and proprietary laboratory analyses fall under specific sections). Purposes: billing and reimbursement, utilization analysis, and — for AI — procedure-level labels and feature signals (what was actually done to the patient).

## 14.4 Integration into healthcare AI

1. **Labels:** ICD codes define cohorts and outcomes (heart-failure readmission = admission with I50.x within 30 days); CPT defines procedures (echo, catheterization) for intervention-adjusted models.
2. **Features:** code counts and sequences (with caution — coding practice varies by hospital and coder).
3. **Auto-coding:** NLP maps note text to codes, reducing coder burden and producing consistent labels at scale.
4. **Billing and classification:** diagnosis-related groups and payment models are computed *from* these codes — so a model trained on billing data learns billing behavior, not just biology.
5. **Interoperability:** shared vocabularies let a model trained in one system be expressed in another's terms.

> **Field note.** Codes are *proxies*. An ICD code is assigned to satisfy documentation and payment as much as to describe truth — "code-based labels" carry coding-practice bias, which must be stated in any model trained on them.

## 14.5 Related systems (one line each)

**SNOMED CT** (granular clinical terms), **LOINC** (lab observations), **RxNorm** (medications), **DRG** (payment grouping). ICD answers *why treated*, CPT answers *what was done*, SNOMED describes *what was found*.

## 14.6 Key terms

- **ICD-10-CM** — diagnostic classification; national clinical modification of the WHO standard.
- **CPT** — AMA-maintained procedure/service terminology.
- **Auto-coding** — NLP-driven assignment of billing/diagnosis codes from clinical text.
- **Code as proxy** — using billing codes as labels, with their inherent coding-practice bias.

## 14.7 Review questions

1. Decode `E11.9` and `99213`: which system, what does each identify?
2. Give two ML uses of ICD codes and one bias they carry.
3. Why can a model trained on ICD-labeled cohorts misbehave at another hospital?


*The official question bank for this unit — 18 questions with full model answers — is in **Appendix D** of this book.*
