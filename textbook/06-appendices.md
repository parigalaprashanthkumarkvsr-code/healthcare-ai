# Appendix A. Glossary of Key Terms

Working definitions for the recurring vocabulary of this book. Each term appears in bold at first use in the chapter that introduces it.

## A.1 Foundations and Clinical Systems

- **AI in Healthcare** — computational systems that learn from clinical data to support medical decisions.
- **Machine learning (ML)** — algorithms that infer patterns from data rather than following hand-coded rules.
- **Deep learning** — multi-layer neural networks that learn features from raw data such as pixels, waveforms, or text.
- **CDSS** — clinical decision support system: software combining patient data and medical knowledge into point-of-care advice.
- **Knowledge base** — the computable medical knowledge inside a CDSS: rules, drug tables, or learned model parameters.
- **Inference engine** — the CDSS component that applies the knowledge base to a specific patient's data.
- **Five rights of CDS** — right information, person, format, channel, and time for decision support.
- **Alert fatigue** — desensitization caused by excessive low-value alerts.
- **MYCIN** — the 1970s rule-based expert system for antibiotic selection; accurate but never deployed.
- **IDx-DR** — the first FDA-authorized autonomous diagnostic AI (diabetic retinopathy, 2018).
- **Telemedicine** — remote clinical care via telecommunications, synchronous or store-and-forward.
- **RPM** — remote patient monitoring: device-streamed vitals with algorithmic escalation.
- **Ambient documentation** — AI-generated visit notes drafted from the consultation audio.

## A.2 Data, Standards, and Coding

- **EHR** — longitudinal, computable digital record of patient encounters, orders, results, and medications.
- **Computability** — the property that data can be queried and processed algorithmically, not just read.
- **Copy-forward** — copying prior note text forward, propagating stale information.
- **HL7 FHIR** — modern web-style clinical data exchange standard built on discrete resources.
- **DICOM** — the medical imaging data standard: pixels plus a rich metadata header.
- **PACS** — picture archiving and communication system; the imaging archive.
- **FASTQ** — raw sequencing reads with per-base quality scores.
- **VCF** — variant call format: called genomic variants per patient.
- **ECG / EEG / PPG** — heart electrical, brain electrical, and pulse waveform signals.
- **ICD-10-CM** — diagnostic classification system (WHO standard, national clinical modification).
- **CPT** — AMA-maintained terminology for procedures and services.
- **SNOMED CT / LOINC / RxNorm** — terminologies for clinical terms, lab observations, and medications.
- **Code as proxy** — using billing codes as ML labels despite their coding-practice bias.

## A.3 Preprocessing and Features

- **Data cleaning** — detecting and correcting errors and inconsistencies so records reflect clinical reality.
- **Normalization** — rescaling features to a bounded range (min–max).
- **Standardization** — rescaling to zero mean and unit variance (z-score).
- **MCAR / MAR / MNAR** — missingness mechanisms: unrelated, explained by observed data, or tied to the missing value itself.
- **Imputation** — filling missing values with estimates (median, KNN, MICE).
- **MICE** — multiple imputation by chained equations; the principled MAR method.
- **Missingness indicator** — a binary feature recording that a value was absent.
- **Selection bias** — a training sample differing systematically from the target population.
- **Feature engineering** — constructing model inputs that encode clinical meaning.
- **Comorbidity index** — a validated summary of disease burden (Charlson, Elixhauser).
- **Observation window** — the time interval whose data is allowed into features.
- **Leakage** — information in training features that would not be available at prediction time.
- **HRV** — heart-rate variability features (RMSSD, SDNN) reflecting autonomic state.
- **Morphology features** — shape descriptors of a waveform (intervals, amplitudes, band powers).
- **LASSO** — L1-regularized regression performing embedded feature selection.
- **PCA** — linear projection maximizing retained variance.
- **NER** — named entity recognition: tagging clinical concepts in text.
- **Negation/assertion detection** — deciding whether an extracted concept is present, absent, or uncertain.
- **UMLS** — the Unified Medical Language System metathesaurus linking clinical vocabularies.
- **Auto-coding** — NLP-driven assignment of billing/diagnosis codes from clinical text.

## A.4 Modeling and Evaluation

- **Supervised learning** — learning from labeled examples to predict defined targets.
- **Unsupervised learning** — discovering structure (clusters, anomalies) without labels.
- **Phenotyping** — deriving patient subtypes from data.
- **Risk prediction** — supervised prediction of a future clinical event.
- **Time-zero** — the defined moment from which features are measured.
- **Calibration** — agreement between predicted probabilities and observed frequencies.
- **Sensitivity / specificity** — recall on positives / recall on negatives.
- **PPV / NPV** — positive and negative predictive values; prevalence-dependent.
- **AUC-ROC / AUPRC** — area under the ROC curve / precision-recall curve.
- **Base-rate trap** — ROC-AUC flattering a model at low prevalence.
- **Operating point** — the threshold chosen for deployment by clinical cost.
- **Class imbalance** — positive prevalence far below 50%.
- **SMOTE** — synthetic minority oversampling by interpolation.
- **Focal loss** — loss down-weighting easy examples to focus on hard ones.
- **LIME** — local surrogate explanation by perturbation.
- **SHAP / Shapley value** — game-theoretic average marginal contribution per feature.
- **TreeSHAP** — exact, fast SHAP for tree ensembles.
- **Grad-CAM** — class-activation map showing where an imaging model looked.
- **CNN** — convolutional neural network; learned local filters for images.
- **Transfer learning** — reusing pretrained representations for a new task.
- **LSTM / GRU** — gated recurrent architectures for sequences.
- **U-Net** — encoder–decoder segmentation network with skip connections.
- **Dice coefficient** — segmentation overlap metric: 2|A∩B|/(|A|+|B|).
- **External validation** — evaluation on data from a different population or institution.
- **MIMIC-III/IV** — de-identified critical-care benchmark datasets.

## A.5 Imaging, Signals, and Genomics

- **WSI** — whole-slide imaging: gigapixel digital scan of a pathology slide.
- **Gleason grading** — prostate cancer aggressiveness grading from tissue architecture.
- **CADe / CADx** — computer-aided detection / diagnosis.
- **Segmentation** — pixel- or voxel-level delineation of a structure.
- **Multi-modal fusion** — combining imaging, labs, notes, and signals in one model.
- **Polygenic risk score (PRS)** — weighted aggregate of common-variant genetic risk.
- **Pharmacogenomics** — genotype-guided drug selection and dosing.
- **Precision oncology** — therapy selection driven by a tumor's molecular profile.
- **Virtual screening** — ML-predicted prioritization of compound libraries.
- **QSAR** — quantitative structure–activity relationship: property prediction from molecular structure.
- **Drug repurposing** — finding new uses for approved drugs (signature reversal, knowledge graphs).
- **CGM** — continuous glucose monitoring.

## A.6 Ethics, Regulation, and Trust

- **Bioethical principles** — autonomy, beneficence, non-maleficence, justice.
- **Accountability gap** — diffusion of responsibility for AI-influenced harm.
- **Automation bias** — over-trusting machine output and stopping independent checking.
- **Demographic parity / equalized odds / calibration within groups** — canonical group-fairness definitions.
- **Fairness audit** — documented, disaggregated evaluation shipped with a model.
- **SaMD** — software as a medical device: software with a medical purpose, not part of a hardware device.
- **510(k) / De Novo / PMA** — the FDA's main approval pathways.
- **PCCP** — predetermined change control plan: pre-authorized protocol for model updates.
- **CE marking / MDR** — the EU conformity regime for medical devices.
- **Intended use** — the claim an authorization covers; the boundary of lawful deployment.
- **Local validation** — re-evaluation of a model on the deploying institution's data.
- **Shadow mode** — silent parallel running of a model before live use.
- **Data drift / concept drift** — input-distribution shift / outcome-relationship shift.
- **Model card** — standardized documentation of intended use, data, performance, and limitations.
- **Calibrated trust** — trust matched to measured, local, per-subgroup reliability.
- **Federated learning / FedAvg** — decentralized training / weighted averaging of local model updates.
- **Cross-silo / cross-device** — federation across a few institutions / many unreliable endpoints.
- **Secure aggregation** — protocol where the server sees only the sum of updates.
- **Differential privacy (ε)** — bounded influence of any one patient, bought with noise.
- **PHI** — protected health information; health data linked to identifiers.
- **BAA** — business associate agreement with any vendor processing PHI.
- **Safe Harbor / Expert Determination** — HIPAA's two de-identification standards.
- **Endpoint–claim match** — the trial must test the specific claim being made.
- **Cluster randomization** — randomizing by clinician or unit to avoid contamination in AI trials.

---

# Appendix B. Suggested Lab Exercises and Datasets

Eight labs spanning the five units. Each lab states its chapter mapping, objective, steps, and deliverable. Where patient data is involved, use only de-identified or synthetic datasets and follow the data-use rules of Chapter 22.

## Lab 1 (Ch. 1–8). Map a Clinical Data Ecosystem

**Objective:** connect the abstract data ecosystem of Unit I to one concrete clinical workflow.

**Steps:**
1. Choose one workflow (stroke care, antenatal screening, or an ICU admission).
2. Enumerate every data type it generates (structured EHR, imaging, signals, notes, claims) and the standard each follows (FHIR, DICOM, FASTQ/VCF).
3. Draw the flow: source → standard → storage → consumer (CDSS, model, dashboard).
4. Mark where privacy rules apply and where data currently cannot move between institutions.
5. Identify one AI application the workflow could support and what data it would need.

**Deliverable:** a one-page ecosystem diagram plus a half-page justification of the AI opportunity and its data gap.

**Ethics note:** use only publicly documented workflows; no real patient identifiers in any artifact.

## Lab 2 (Ch. 9–10). Clean a Messy Clinical Extract

**Objective:** practice the cleaning and missing-data discipline of Chapter 9–10 on a deliberately dirty dataset.

**Steps:**
1. Take a synthetic EHR extract (Synthea or a course-provided CSV) with mixed units, duplicates, and gaps.
2. Write plausibility checks (physiologic ranges, chronology) and run them; log every violation.
3. Harmonize units (mg/dL ↔ mmol/L) and document the conversion factors used.
4. Classify missingness for three columns as MCAR, MAR, or MNAR and justify each label clinically.
5. Impute with two methods (median and MICE or a NaN-aware learner) and add missingness indicators.
6. Compare downstream model performance under each imputation strategy.

**Deliverable:** a cleaning script with a logged audit trail and a short report on how missingness handling changed the model.

## Lab 3 (Ch. 11–12). Engineer EHR Features Without Leakage

**Objective:** build a time-zeroed feature matrix for a readmission or deterioration target.

**Steps:**
1. Define time-zero and an observation window (e.g., first 24 h → predict the rest of the stay).
2. Engineer at least six features per data family: labs (last/min/max/slope), comorbidity index, medications, utilization, missingness indicators.
3. Perform a leakage audit: list every feature and argue it is computable at prediction time.
4. Split by patient (never by encounter) and fit scalers on training data only.
5. Train a logistic-regression baseline and a gradient-boosted model; compare AUROC, AUPRC, and calibration.

**Deliverable:** the feature table with per-feature leakage justification and the two-model comparison.

## Lab 4 (Ch. 13–14). Clinical NLP: Negation and Auto-Coding

**Objective:** extract structured signals from clinical text without falling for its negations.

**Steps:**
1. Take 20–50 de-identified discharge summaries or radiology reports (course-provided or MIMIC-derived samples).
2. Run a clinical NLP model (scispaCy or a clinical BERT variant) for entity extraction.
3. Implement or apply a negation/assertion pass (NegEx-style) and measure how many entities flip from "present" to "absent".
4. Map extracted concepts to ICD categories by hand for ten notes; compare against the notes' actual coded diagnoses.
5. Write the failure analysis: which abbreviations, hedges, and family-history mentions fooled the pipeline?

**Deliverable:** an extraction notebook plus a half-page "where clinical NLP breaks" memo.

## Lab 5 (Ch. 15–20). Train and Evaluate an Imbalanced Risk Model

**Objective:** build an honest evaluation of a rare-event model, the core skill of Unit III.

**Steps:**
1. Use a dataset with low positive prevalence (e.g., ICU mortality or a rare-disease cohort).
2. Train the model ladder: logistic regression → GBM; apply class weights or focal loss.
3. Evaluate with accuracy, AUROC, AUPRC, and precision@k; show numerically why accuracy fails.
4. Plot the PR curve and the calibration curve; choose an operating point from a stated false-alert budget.
5. Report the confusion matrix at that operating point with absolute numbers, noting small-denominator fragility.

**Deliverable:** an evaluation report a clinician could read, with every metric carrying its clinical meaning.

## Lab 6 (Ch. 17, 24–25). Transfer Learning and Segmentation on Medical Images

**Objective:** fine-tune a pretrained CNN and run a U-Net segmentation, with attention checks.

**Steps:**
1. Fine-tune an ImageNet-pretrained ResNet/EfficientNet on a chest X-ray classification task (CheXpert sample or NIH sample).
2. Augment with clinically valid transforms only; justify each augmentation's anatomical plausibility.
3. Evaluate per-finding AUPRC; run Grad-CAM on correct and incorrect predictions and check for shortcut attention (markers, drains, pacemakers).
4. Train a small U-Net (or nnU-Net config) on a segmentation task (lungs or retinal vessels) and report Dice/IoU.
5. Compare per-subgroup performance if demographic metadata is available.

**Deliverable:** two notebooks (classification + segmentation) and an attention-check figure gallery with captions.

## Lab 7 (Ch. 18, 26). Time-Series Deterioration Prediction

**Objective:** build a sequence model on irregularly sampled ICU data.

**Steps:**
1. Extract vitals and labs for a cohort from MIMIC-III/IV or a provided extract; define time-zero and a prediction horizon.
2. Build the input representation: time-aware encoding (time since last measurement) and channel masks for missing streams.
3. Train an LSTM/GRU for deterioration within the horizon; use a unidirectional model for deployment realism.
4. Validate out-of-time (later months in test) and by patient; compare against a NEWS-style baseline score.
5. Analyze errors: which trajectories fooled the model, and would the alert burden be acceptable?

**Deliverable:** the model notebook plus a deployment memo addressing the five rights (Chapter 3).

## Lab 8 (Ch. 21, 30–35). Explanation, Fairness Audit, and Model Card

**Objective:** ship the governance artifact for a model built in an earlier lab.

**Steps:**
1. Generate SHAP (TreeSHAP) attributions for the Lab 5 model; verify additivity on one patient.
2. Compose the explanation artifact: score with uncertainty, top attributions in clinical language, similar cases, one counterfactual, stated limitations.
3. Run a fairness audit: per-subgroup sensitivity, specificity, PPV, and calibration; state which fairness definition you are serving and why.
4. Draft the model card: intended use, data provenance, evaluation, operating point, limitations, monitoring plan.
5. Write the drift-monitoring plan: which inputs to watch, which outcome-linked checks, and the incident-reporting channel.

**Deliverable:** a model card document plus the audit notebook — the complete governance package of Chapters 31–33.

## Datasets commonly used (verify licenses/availability)

| Dataset | Contents | Access | Typical labs |
|---|---|---|---|
| **MIMIC-III / MIMIC-IV** | De-identified ICU stays: vitals, labs, notes, outcomes | Credentialed access after training (PhysioNet) | Labs 3, 5, 7, 8 |
| **eICU** | Multi-center ICU dataset | PhysioNet, credentialed | Lab 7 |
| **PhysioNet challenge data** | Waveforms and time series | Open with per-dataset terms | Lab 7 |
| **CheXpert / NIH ChestX-ray14** | Chest X-rays with findings labels | Open registration / open | Lab 6 |
| **MIMIC-CXR** | Chest X-rays + reports (pairing for Lab 4) | PhysioNet, credentialed | Labs 4, 6 |
| **CAMELYON16/17** | Whole-slide lymph-node images with labels | Open | Lab 6 |
| **ISIC archive** | Dermoscopy images | Open with terms | Lab 6 |
| **BraTS** | Brain MRI segmentation challenge | Open registration | Lab 6 |
| **EyePACS / Messidor** | Retinal fundus images | Open / open registration | Lab 6 |
| **PTB-XL** | Large 12-lead ECG dataset | Open (physionet.org) | Lab 6–7 |
| **Synthea** | Synthetic patient records generator | Open source | Labs 2–3 |
| **UCI/academic tabular sets** | Small teaching datasets (heart disease, diabetes) | Open | Labs 2, 5 |

Always cite the dataset's own license and required attribution in any derived work; several require a data-use agreement and prohibit redistribution or commercial use.

---

# Appendix C. Further Reading and Primary Sources

Primary literature, standards, and books that anchor the claims in this book. Where a chapter leans on a source, it is marked.

## C.1 Landmark primary literature

- Esteva et al., "Dermatologist-level classification of skin cancer with deep neural networks," *Nature* 542 (2017) — Ch. 1, 17, 23.
- Gulshan et al., "Development and validation of a deep learning algorithm for detection of diabetic retinopathy in retinal fundus photographs," *JAMA* 316 (2016) — Ch. 23, 32.
- Rajpurkar et al., "CheXNet: radiologist-level pneumonia detection on chest X-rays with deep learning" (2017, arXiv) — Ch. 17.
- Rajkomar et al., "Machine learning in medicine," *NEJM* 380 (2019) — Ch. 15, 19.
- Rajkomar et al., "Scalable and accurate deep learning with electronic health records," *npj Digital Medicine* 1 (2018) — Ch. 11, 15.
- Obermeyer et al., "Dissecting racial bias in an algorithm used to manage the health of populations," *Science* 366 (2019) — Ch. 31.
- Ahlgren et al., "Identification of novel diabetes sub-types via clustering," *Lancet Digital Health* (2018) — Ch. 16.
- Attia et al., "An artificial intelligence-enabled ECG algorithm for the identification of patients with atrial fibrillation during sinus rhythm," *Lancet* 394 (2019) — Ch. 6, 23.
- Perez et al., "Large-scale assessment of a smartwatch to identify atrial fibrillation" (Apple Heart Study), *NEJM* 381 (2019) — Ch. 23, 29.
- Jumper et al., "Highly accurate protein structure prediction with AlphaFold," *Nature* 596 (2021) — Ch. 27, 28.
- Isensee et al., "nnU-Net: a self-configuring method for deep learning-based biomedical segmentation," *Nature Methods* (2021) — Ch. 25.
- Jin et al., "Assessing the performance of AI-assisted colonoscopy in randomized trials" literature (multiple RCTs, 2019–2023) — Ch. 36.
- Lang et al., MASAI mammography screening trial protocol/results, *Lancet Digital Health / Lancet Oncology* (2023–2025) — Ch. 36.
- Kleinberg, Mullainathan, and Raghavan, "Inherent trade-offs in the fair determination of risk scores" (2016) — Ch. 31.
- Hardt, Price, and Srebro, "Equality of opportunity in supervised learning," *NeurIPS* (2016) — Ch. 31.
- Rieke et al., "The future of digital health with federated learning," *npj Digital Medicine* 3 (2020) — Ch. 35.

## C.2 Books and major reviews

- Topol, *Deep Medicine: How Artificial Intelligence Can Make Healthcare Human Again* (Basic Books, 2019) — the field's best-known synthesis.
- Zhou, Greenspan, and Shen (eds.), *Deep Learning for Medical Image Analysis* (Academic Press) — imaging chapters in depth.
- Beam and Kohane, "Big data and machine learning in health care," *JAMA* 319 (2018) — a compact orientation.
- Yu et al., "Artificial intelligence in healthcare," *Nature Biomedical Engineering* review series — broad landscape.

## C.3 Regulation, standards, and policy

- HIPAA Privacy and Security Rules (45 CFR Parts 160/164) — Ch. 22.
- HHS guidance on de-identification (Safe Harbor / Expert Determination) — Ch. 22.
- FDA guidance: "Predetermined Change Control Plans for Machine Learning-Enabled Medical Devices" (2023–2025) and the FDA list of AI/ML-enabled medical devices — Ch. 32.
- IMDRF, "Software as a Medical Device: Possible Framework for Risk Categorization" — Ch. 32.
- EU Medical Device Regulation (MDR) 2017/745 — Ch. 32.
- EU Artificial Intelligence Act (2024) — high-risk obligations — Ch. 32.
- WHO, "Ethics and governance of artificial intelligence for health" (2021) — Ch. 30.
- NIST AI Risk Management Framework (AI RMF 1.0, 2023) — Ch. 33.

## C.4 Benchmarks, tools, and documentation

- PhysioNet (MIMIC-III/IV, eICU, PTB-XL) — physionet.org — Labs 3, 5, 7.
- CheXpert, MIMIC-CXR, CAMELYON16, ISIC, BraTS — imaging benchmarks — Lab 6.
- SHAP documentation (TreeSHAP) and the LIME reference implementation — Ch. 21.
- Model Cards for Model Reporting (Mitchell et al., *FAT\* 2019*) — Ch. 33.
- scispaCy and clinical BERT model repositories — Ch. 13.

## C.5 Reading discipline

Primary sources over vendor marketing; randomized trials over retrospective claims; read the limitations section before the abstract. When a source and this book disagree, check the source's date and setting — healthcare AI moves fast enough that two-year-old external-validation results can already be stale.
---

---

---

# Appendix D. Question Bank with Model Answers

This appendix is the assessment layer of the book: the official question bank of the Healthcare AI course — five units × eighteen questions (5 × 2-mark, 5 × 3-mark, 5 × 5-mark, 3 × 10-mark = **90 questions**) — with a full model answer for every question. Every answer is presented in **structured form**: a one-line *key point* for the whole answer, then numbered **sub-topics**, each carrying its own key point and short bullet points or a comparison table — no paragraph walls.

| Tier | Marks | Cognitive demand | Shape of the structured answer |
|---|---|---|---|
| T1 | 2 | Recall / understanding | Key point + 2–4 labelled bullet points |
| T2 | 3 | Short comparison or list | Key point + sub-topics, or a comparison table |
| T3 | 5 | Structured explanation | 4–6 sub-topics, each with key point + bullets, ending in a takeaway |
| T3 | 10 | Integrated essay / design | Parts (A)–(F), each with key point + bullets, ending in a synthesis |

**Study discipline:** read the key point first, cover the rest, and attempt to rebuild the sub-topics from memory. The 10-mark answers double as condensed summaries of each unit; if you can reconstruct their parts, you know the unit.

## D.1 Unit I — 2-Mark Questions (T1 · recall)

**Q1. What is AI in Healthcare?**

*Key point — AI in Healthcare is the application of computational systems that perceive clinical data, learn patterns, and support or perform tasks normally requiring human medical intelligence.*

- **Definition:** Computational systems that perceive clinical data, learn patterns from it, and support or perform tasks that normally require human medical intelligence.
- **Scope:** Diagnosis, prognosis, monitoring, and treatment planning.
- **Example:** A CNN that screens retinal photographs for diabetic retinopathy.

**Q2. Define Clinical Decision Support System (CDSS).**

*Key point — A CDSS is computer-based software that combines patient-specific data with computable medical knowledge to present patient-specific advice at the point of care.*

- **Definition:** Computer-based software that assists clinical decision-making by combining patient-specific data with computable medical knowledge.
- **Knowledge sources:** Guideline rules, drug databases, or learned models.
- **Examples:** A drug–drug interaction alert; an ML sepsis early-warning score delivered at the point of care.

**Q3. What is an Electronic Health Record (EHR)?**

*Key point — An EHR is a longitudinal, computable digital record of a patient's health information shared across care settings.*

- **Definition:** A longitudinal digital record of a patient's health information stored in computable form and shared across care settings.
- **Contents:** Demographics, encounters, diagnoses, medications, laboratory results, imaging links, and notes.
- **Significance:** Computability (not merely digital storage) is what makes healthcare AI possible.

**Q4. List any four types of medical data used in healthcare AI.**

*Key point — Healthcare AI draws on structured EHR data, lab/vital time series, medical images, and physiological signals (plus genomics, notes, claims, wearables).*

- **Structured EHR data:** Demographics, diagnoses, medications.
- **Laboratory/vitals:** Numeric results and vital-sign time series.
- **Medical images:** X-ray, CT, MRI (DICOM), whole-slide pathology.
- **Physiological signals:** ECG, EEG, PPG. *(Also acceptable: genomic sequences (FASTQ/VCF), unstructured notes, claims data, wearable streams.)*

**Q5. What is telemedicine?**

*Key point — Telemedicine delivers clinical care at a distance, synchronously or asynchronously, over telecommunications.*

- **Definition:** Delivery of clinical care at a distance using telecommunications.
- **Modes:** Synchronous (video consultation) or asynchronous (store-and-forward, where a captured image or signal is read later).
- **Example:** A remotely captured retinal photograph read by a screening AI, with positives referred to an ophthalmologist.

## D.2 Unit I — 3-Mark Questions (T2 · application)

**Q1. State the role of AI in Clinical Decision Support Systems (CDSS).**

*Key point — AI is the newest inference engine inside the CDSS architecture, extending it from known-rule support to learned-pattern support while inheriting CDSS discipline.*

**1. AI as the inference engine**

- *Key point:* In a knowledge-based CDSS the inference engine matches hand-coded rules against patient data; AI replaces or augments this with models learned from data.
- Knowledge-based CDSS: matches guideline rules and drug-interaction tables against patient data.
- AI: predicts risk (sepsis hours before criteria are met), recommends order sets, triages worklists, drafts documentation.

**2. Output and presentation**

- *Key point:* The AI component outputs a patient-specific score or suggestion which the interface layer presents to the clinician.
- The clinician remains accountable for the decision.

**3. What AI adds**

- *Key point:* AI extends CDSS from *known-rule* support to *learned-pattern* support — patterns nobody hand-coded.

**4. Inherited discipline — the five rights**

- *Key point:* AI inherits CDSS discipline: right information, person, format, channel, time still decide whether the support is usable.

**Q2. List the major types of medical data used in healthcare AI.**

*Key point — Eight major data types, each with a different structure, standard, and AI use.*

| Type | Content |
|---|---|
| Structured EHR | Demographics, ICD diagnoses, RxNorm meds, orders |
| Lab & vital signs | Numeric time series with reference ranges |
| Medical imaging | X-ray/CT/MRI/ultrasound in DICOM; whole-slide pathology |
| Physiological signals | ECG, EEG, PPG waveforms |
| Genomic data | Sequencing reads (FASTQ), variant calls (VCF) |
| Unstructured notes | Discharge summaries, radiology/progress reports |
| Administrative/claims | Billing-coded episodes |
| Wearable/mHealth | Consumer device streams |

**Q3. Differentiate an Electronic Health Record (EHR) from traditional patient records.**

*Key point — The decisive difference is computability: an EHR's structured, timestamped data can train models and trigger decision support; a paper chart cannot.*

| Dimension | Paper record | EHR |
|---|---|---|
| Accessibility | Single physical copy, one site | Multi-user, multi-site, backed up |
| Legibility/structure | Handwriting; prose only | Coded structured fields + typed notes |
| Computability | Readable only by humans | Queryable — substrate of ML and CDSS |
| Coordination | Slow transfer between providers | Real-time sharing via HL7/FHIR |
| Decision support | Impossible | Integrated alerts and order sets |
| New risks | Loss/fire/theft | Breaches, cyberattacks, usability burden |

**Q4. State any three applications of AI in healthcare.**

*Key point — Three flagship applications: diagnostic imaging, predictive monitoring, and clinical operations/documentation (also acceptable: drug discovery, genomic interpretation, telemedicine triage).*

**1. Diagnostic imaging**

- *Key point:* CNNs detect disease at specialist-level performance across modalities.
- Pneumonia on chest X-rays; intracranial hemorrhage on CT; diabetic retinopathy on retinal photographs.

**2. Predictive monitoring**

- *Key point:* Models score ICU patients hourly from vitals and labs.
- Warn of deterioration hours in advance.

**3. Clinical operations and documentation**

- *Key point:* AI automates coding, drafting, and risk targeting.
- Automated ICD coding of notes; ambient drafting of visit notes; readmission-risk prediction targeting post-discharge care.

**Q5. List any three challenges of AI in healthcare.**

*Key point — Three core challenges: fragile data, protected and regulated data, and the trust/interpretability gap (plus imbalance, generalizability, workflow, equity).*

**1. Data quality and fragmentation**

- *Key point:* Missing values, unit inconsistencies, copy-forward errors, and silos across institutions make models fragile (Unit II).

**2. Privacy and regulation**

- *Key point:* Health data is legally protected (HIPAA/GDPR); diagnostic AI may need FDA/CE approval before clinical use (Units III, V).

**3. Trust and interpretability**

- *Key point:* Clinicians need to see *why* a model recommends an action; black-box predictions are resisted, and automation bias is a safety hazard (Unit V).

**Also acceptable:** class imbalance for rare diseases, generalizability across hospitals, workflow integration, equity and bias.

## D.3 Unit I — 5-Mark Questions (T3 · structured explanation)

**Q1. Explain the healthcare systems and data ecosystem used in AI-based healthcare applications.**

*Key point — The ecosystem is a four-layer stack of sources, standards, infrastructure, and consumers whose defining properties are heterogeneity and privacy, with AI value coming from joining sources on the right entity.*

**1. Sources**

- *Key point:* The raw feeds from which clinical AI learns, each differing in structure and reliability.
- EHRs (structured: demographics, coded diagnoses, medications, orders; narrative: notes); lab and vital-sign streams; imaging in DICOM held in PACS.
- Physiological signals (ECG/EEG/PPG); genomics (FASTQ→VCF); claims (ICD/CPT-coded); consumer/wearable streams.

**2. Standards and terminologies**

- *Key point:* Standards make records computable and linkable across systems.
- HL7/FHIR for exchange; DICOM for imaging.
- ICD/SNOMED CT/LOINC/RxNorm for vocabulary.

**3. Infrastructure**

- *Key point:* Warehouses/lakes where data is joined on patient identifiers, with governance for access and privacy.

**4. Consumers**

- *Key point:* Where the joined data delivers value.
- CDSS at the bedside; population dashboards; ML training pipelines.

**5. Defining properties**

- *Key point:* Heterogeneity and privacy shape all real work.
- Heterogeneity: each source differs in structure, frequency, reliability — preprocessing (Unit II) and entity linkage dominate real projects.
- Privacy: data cannot move freely — shapes de-identification practice and federated architectures.

*Takeaway — AI value comes from joining sources on the right entity, such as linking a rising lactate trajectory to a deterioration prediction, not from any single feed alone.*

**Q2. Describe the role of AI in Clinical Decision Support Systems (CDSS) with suitable examples.**

*Key point — AI powers the CDSS inference engine with learned patterns across sepsis warning, drug safety, imaging triage, and guideline adherence, but adoption is decided by the five rights, and the clinician remains the decision-maker.*

**1. CDSS architecture**

- *Key point:* A CDSS has four components: patient data, knowledge base, inference engine, and interface.
- AI's role: power the inference engine with learned patterns rather than only hand-coded rules.

**2. Sepsis early warning**

- *Key point:* An ML model scores every admitted patient hourly from vitals, labs, and demographics.
- A rising score alerts a rapid-response team hours before clinical criteria.
- Delivers the *right information at the right time*.

**3. Drug safety**

- *Key point:* Beyond static interaction rules, ML predicts patient-specific adverse-drug-event risk.
- Inputs: renal function and co-medications.

**4. Imaging triage and guideline adherence**

- *Key point:* AI prioritizes work and surfaces guideline-concordant care.
- Imaging: a hemorrhage-detection model reorders the radiology worklist so likely-positives are read first.
- Guidelines: models surface guideline-concordant order sets and flag deviations.

**5. Adoption discipline**

- *Key point:* The five rights decide adoption — an accurate model presented as 200 daily interruptive alerts is operationally worthless.
- AI extends CDSS coverage to patterns nobody encoded.
- The clinician remains the decision-maker; AI supplies patient-specific, learned, timely evidence.

*Takeaway — AI supplies learned, patient-specific, timely evidence inside the CDSS, but interface design and the five rights decide whether it is actually used.*

**Q3. Explain the different types of medical data used in healthcare AI.**

*Key point — Seven data types, each implying different preprocessing, models, and privacy handling — which is why the data ecosystem is taught before the models.*

**1. Structured EHR data**

- *Key point:* Relational rows used for risk prediction and phenotyping.
- Patients, encounters, coded diagnoses (ICD), medications (RxNorm).

**2. Laboratory and vital data**

- *Key point:* Numeric time series where trajectories matter more than single values.
- Example: hemoglobin over 48 hours; used for deterioration and sepsis prediction.

**3. Medical imaging**

- *Key point:* Pixel data plus acquisition metadata, used for detection, classification, segmentation.
- X-ray, CT, MRI, ultrasound (DICOM); whole-slide pathology images.

**4. Physiological signals**

- *Key point:* Waveform data for continuous physiology.
- ECG, EEG, PPG; used for arrhythmia detection, sleep staging, seizure prediction.

**5. Genomic data**

- *Key point:* Sequencing outputs used for variant interpretation and precision oncology.
- FASTQ reads and VCF variant calls.

**6. Unstructured notes**

- *Key point:* Free text needing NLP for extraction and auto-coding.
- Abbreviations and negation complicate processing.

**7. Claims data**

- *Key point:* Billing-coded episodes used for population health and cost models.

*Takeaway — Each data type implies different preprocessing, models, and privacy handling.*

**Q4. Discuss the applications of AI in diagnosis, prognosis, and patient monitoring.**

*Key point — The three verbs cover what the patient has (diagnosis), what will happen (prognosis), and what is changing now (monitoring), each with its own data, evaluation, and failure mode.*

**1. Diagnosis**

- *Key point:* Classifies the present state, evaluated per-finding at clinically chosen thresholds.
- CNNs read chest X-rays for pneumonia, CT for hemorrhage, retinal photos for retinopathy; ECG models classify rhythms; lab-pattern models flag sepsis.
- Evaluation: per-finding sensitivity/specificity — a missed cancer and a false positive carry very different costs.

**2. Prognosis**

- *Key point:* Predicts future outcomes from longitudinal data, blending classical survival analysis with deep survival models.
- Outcomes: mortality, readmission, recurrence.
- Difficulty: censoring and delayed labels; danger: feedback — high-risk labeling changes care, which changes the outcome being predicted.

**3. Monitoring**

- *Key point:* Runs the prediction logic continuously — AI's largest scale advantage and its alarm-burden failure mode.
- ICU deterioration prediction gives hours of warning; ward early-warning augments scores like NEWS.
- Wearables screen for atrial fibrillation from PPG; CGM forecasts glucose for insulin dosing.
- Scale advantage: watching every patient every minute versus a clinician sampling twice daily.

*Takeaway — Together the three verbs cover what the patient has, what will happen, and what is changing now.*

**Q5. Explain the use of AI in Radiology, Pathology, Oncology, and Cardiology.**

*Key point — Each specialty's AI is shaped by its data substrate, its evaluation method, and its distinctive barrier: liability (radiology), stain variability (pathology), slow labels (oncology), and consumer-device validation (cardiology).*

**1. Radiology**

- *Key point:* AI detects and triages on DICOM pixels, deployed as worklist triage or second-reader with the radiologist accountable.
- Chest X-ray findings; CT intracranial hemorrhage; lung-nodule screening; mammography support (AI-supported reading has matched double-reading workload reduction with comparable detection in large trials).

**2. Pathology**

- *Key point:* Whole-slide imaging turns slides into gigapixel images; staining/scanner variability is the central engineering problem.
- Mitosis detection, Gleason grading, lymph-node metastasis detection (CAMELYON16), biomarker quantification.

**3. Oncology**

- *Key point:* AI supports detection, prognosis, precision treatment, radiotherapy, and trials — with slow ground truth shaping evaluation.
- Prognosis via survival models; matching tumor genomics to targeted therapy; radiotherapy auto-contouring of organs at risk; trial matching; ground truth is slow (years to recurrence).

**4. Cardiology**

- *Key point:* Deep models read ECGs at cardiologist level and consumer devices screen continuously.
- 12-lead ECG classification across dozens of rhythms at cardiologist level.
- Wearables screen for AF from single-lead PPG (Apple Heart Study); echo AI estimates ejection fraction.

*Takeaway — Each specialty's AI is shaped by its data substrate, evaluation method, and barrier: liability in radiology, stain variability in pathology, slow labels in oncology, consumer-device validation in cardiology.*

## D.4 Unit I — 10-Mark Questions (T3 · integrated essay/design)

**Q1. Discuss the healthcare systems and data ecosystem used in AI-based healthcare applications, including the role of AI in Clinical Decision Support Systems (CDSS).**

*Key point — The heterogeneous data ecosystem, its standards, AI-powered CDSS, and shared challenges form one continuous chain from data to decision.*

**A. The data ecosystem**

- *Key point:* AI-based healthcare applications sit downstream of a heterogeneous data ecosystem of eight source types.
- **EHRs** — the longitudinal computable record: demographics, encounters, coded diagnoses (ICD), medications (RxNorm), orders, narrative notes.
- **Lab and vital-sign streams** — numeric time series with timestamps and reference ranges; the trajectories (not single values) carry most predictive signal.
- **Medical imaging** — X-ray, CT, MRI, ultrasound as DICOM objects (pixels + rich metadata) in PACS.
- **Physiological signals** — ECG, EEG, PPG waveforms from bedside monitors and wearables.
- **Genomics** — sequencing reads (FASTQ) aligned (BAM) and called into variants (VCF).
- **Unstructured notes, claims, wearables** — discharge summaries/radiology reports; billing-coded episodes (ICD/CPT); consumer mHealth streams.

**B. Standards make it computable**

- *Key point:* Shared standards turn a set of silos into one joinable patient story, with privacy law governing every movement.
- HL7 v2 and FHIR model clinical data as exchangeable messages and API resources; DICOM standardizes imaging.
- ICD, SNOMED CT, LOINC, RxNorm provide the vocabularies that turn prose into codes.
- With standards, one patient's story can be joined across institutions and modalities.
- Privacy law (HIPAA/GDPR) governs every movement — motivating de-identification and, increasingly, federated architectures where data never leaves the hospital.

**C. AI inside CDSS**

- *Key point:* AI supplies a learned inference engine in a four-part CDSS, but interface design (alert burden) decides adoption more than model accuracy does.
- CDSS components: patient data, knowledge base, inference engine, interface at the point of care.
- Traditional inference: rule-based (drug–drug interaction tables, guideline order sets) — transparent but brittle.
- Learned inference: sepsis models scoring every patient hourly from vitals and labs; readmission models targeting post-discharge care; imaging models reordering worklists; documentation models drafting notes.
- The system still obeys the five rights of CDS — right information, person, format, channel, time; the clinician remains accountable.

**D. Challenges**

- *Key point:* Data, silo, label, privacy, and trust problems span the whole pipeline.
- Data quality: missingness, unit chaos, copy-forward; silos and interoperability; sparsity of rare-disease labels.
- Privacy and security; interpretability; generalizability across hospitals.
- Workflow integration, equity, and reimbursement.

**E. Conclusion**

- *Key point:* Data engineering, modeling, and delivery are one system, not three subjects.
- The ecosystem determines what AI can learn.
- The standards determine what it can join.
- The CDSS determines whether the learned pattern reaches a decision at the right moment.

**Synthesis**

- Ecosystem → standards → CDSS form one continuous chain from data to decision.
- Standards enable joining; CDSS discipline (five rights, clinician accountability) enables delivery.
- Treating data engineering, modeling, and delivery as one system is the central lesson.

**Q2. Explain the different types of medical data used in healthcare AI and discuss their applications in diagnosis, prognosis, and patient monitoring.**

*Key point — Eight data types map onto three clinical verbs — diagnosis (cross-sectional), prognosis (longitudinal), monitoring (continuous) — under shared constraints of missingness, privacy, and entity linkage.*

**A. Data types**

- *Key point:* Eight data types, each with distinct structure, scale, and analysis needs.
- **Structured EHR** — relational tables of patients, encounters, ICD-coded diagnoses, RxNorm medications, orders; longitudinal by nature.
- **Lab results and vitals** — numeric time series; the trajectory of a value (rising lactate, falling hemoglobin) is the clinical signal.
- **Medical imaging** — DICOM pixels from X-ray, CT, MRI, ultrasound; whole-slide pathology scans at gigapixel scale; each image carries acquisition metadata that itself matters for models.
- **Physiological signals** — ECG (millivolts over seconds), EEG, PPG; high-frequency, waveform-native.
- **Genomics** — ~3 billion base pairs per genome; analyzed as variants (VCF) per patient and tumor.
- **Notes, claims, wearables** — the majority of clinical knowledge in prose (needs NLP); billing-complete but clinically shallow; continuous consumer-grade streams.

**B. Mapping to applications**

- *Key point:* Each clinical verb consumes a different kind of data — cross-sectional for diagnosis, longitudinal for prognosis, continuous for monitoring.
- **Diagnosis** consumes cross-sectional evidence at a decision point: imaging and signals dominate (CNN pneumonia detection, ECG rhythm classification, retinopathy screening), supported by structured EHR context and note-extracted history.
- **Prognosis** consumes longitudinal records: EHR trajectories, labs, comorbidities, utilization history feed survival and deterioration models (mortality, readmission, recurrence); genomics adds molecular prognosis in oncology; labels arrive late and censored.
- **Monitoring** consumes continuous streams: vitals plus labs scored hourly for ICU deterioration; wearables screening continuously for AF; CGM forecasting glucose minutes ahead.

| Verb | Dominant data | Example |
|---|---|---|
| Diagnosis | Cross-sectional imaging/signals | CNN pneumonia detection |
| Prognosis | Longitudinal EHR/labs | Survival models |
| Monitoring | Continuous streams | CGM glucose forecast |

**C. Cross-cutting constraints**

- *Key point:* Every data type raises the same issues, and type + verb together determine whether AI helps.
- Missingness is informative — an un-ordered lab is not random.
- Privacy governs all movement of the data; labels are imperfect gold standards.
- Joining sources on the right entity is where most real value (and most real bugs) live.

**Synthesis**

- The data type determines the model family; the clinical verb determines the evaluation.
- The same patient may pass through all three verbs: diagnosed with sepsis from a monitored trajectory, prognosed for ICU length of stay, monitored for recovery.
- Integration of data type and clinical verb determines whether AI helps.

**Q3. Compare traditional healthcare systems with AI-enabled healthcare systems, highlighting applications, limitations, and challenges.**

*Key point — AI-enabled systems change speed, breadth, consistency, and reach at every care stage, but the goal is disciplined augmentation, not replacement, with accountability kept human.*

**A. Stage-by-stage comparison**

- *Key point:* Each care stage shifts from human-variable to AI-consistent execution.
- **History taking:** clinician interview with variable completeness vs structured intake and chatbot triage with consistent but context-poor capture.
- **Investigation:** experience-guided ordering vs CDSS-suggested evidence-based order sets.
- **Diagnosis:** expert pattern recognition with inter-observer variability vs model-assisted reading with consistent first-pass interpretation.
- **Prognosis:** clinical gestalt plus static scores vs learned models on full EHR trajectories.

| Stage | Traditional | AI-enabled |
|---|---|---|
| Monitoring | Periodic observation, threshold alarms | Continuous learned early-warning |
| Administration | Manual notes and coding | Automated drafting/coding assistance |

**B. What AI changes**

- *Key point:* The deepest gain is distributional — every patient gets the *median expert* everywhere.
- Speed: milliseconds per study; breadth: every patient, every hour, no fatigue.
- Consistency: no inter-observer drift.
- Reach: expert-level first-pass reading where experts are scarce.

**C. What must not change**

- *Key point:* Accountability and human oversight — regulation is written around the clinician signing the decision.
- Safe default: *AI proposes, human disposes*.
- Autonomy only in narrow, validated, low-blast-radius tasks (autonomous retinopathy screening triggering a referral).

**D. Limitations of each**

- *Key point:* Traditional systems fail through human limits; AI systems fail through data and deployment drift.
- **Traditional:** knowledge decay, fatigue, variability, access inequity, no continuous vigilance.
- **AI-enabled:** dataset shift (models tuned to one hospital's population and practice), automation bias, alert fatigue, silent data-quality failures, opaque reasoning, performance decay after deployment.

**E. Challenges of the hybrid**

- *Key point:* Most hybrid failures are workflow, not accuracy.
- Integration into workflows; validation and regulation (FDA/CE pathways for SaMD).
- Privacy (HIPAA-compliant pipelines); equity (device and data gaps).
- Liability allocation; local monitoring with drift detection after go-live.

**F. Verdict**

- *Key point:* Not replacement but augmentation with discipline.
- AI supplies tireless, consistent, broad first-pass intelligence.
- The traditional system supplies context, accountability, and the human relationship care depends on.

**Synthesis**

- The engineering challenge is to compose the two systems so each compensates for the other's failure mode.
- Traditional strengths (context, accountability, relationship) cover AI weaknesses (drift, opacity, bias); AI strengths (speed, consistency, reach) cover human limits (fatigue, variability, scarce expertise).
- That composition is exactly what Units II–V of this book are about.

## D.5 Unit II — 2-Mark Questions (T1 · recall)

**Q1. What is data cleaning?**

*Key point — Data cleaning detects and corrects errors and inconsistencies so the dataset accurately reflects clinical reality.*
- **Definition:** Detecting and correcting errors and inconsistencies in a dataset so it accurately reflects clinical reality.
- **Clinical operations:** De-duplicating encounters; harmonizing units (mg/dL ↔ mmol/L); plausibility checks (heart rate 900 bpm); date-chronology checks; mapping free text to standard codes.

**Q2. Define data normalization.**

*Key point — Normalization rescales numeric features to a common bounded scale so differently measured features contribute comparably.*
- **Definition/formula:** Rescaling numeric features to a common, bounded scale — typically min–max to [0,1]: `x' = (x − min)/(max − min)`.
- **Purpose:** Features in different units (heart rate vs cholesterol) contribute comparably to distance-based models and neural networks.
- **Caveat:** Sensitive to outliers, so clinical data often uses robust variants instead.

**Q3. What are missing values in clinical data?**

*Key point — Missing values are absent expected measurements whose absence pattern is often clinically informative.*
- **Definition:** Absent measurements for features the schema expects — a lab test not drawn, a field left blank.
- **Causes:** Selective test ordering, device gaps, documentation habits.
- **Clinical meaning:** The absence pattern is often informative (a test not ordered because the clinician expected normality).
- **Classification/handling:** Classified as MCAR, MAR, or MNAR; handled by deletion or imputation.

**Q4. What is feature engineering?**

*Key point — Feature engineering constructs model inputs that encode clinical meaning, often mattering more than model choice.*
- **Definition:** Constructing model inputs that encode clinical meaning from raw data.
- **Example:** A raw creatinine series → the features {last value, 24-h slope, days since last measurement, abnormal-count}.
- **Significance:** Good features express clinical concepts (trajectory, rarity, comorbidity burden) and often matter more to performance than the choice of model.

**Q5. Expand ICD and CPT.**

*Key point — ICD classifies diagnoses (WHO-maintained); CPT classifies procedures and services (AMA-maintained).*
- **ICD:** International Classification of Diseases (WHO-maintained; ICD-10/10-CM clinically modified; ICD-11 emerging) — classifies *diagnoses* (why the patient was seen).
- **CPT:** Current Procedural Terminology (AMA-maintained) — classifies *procedures and services* (what was done), e.g., `99213` = established-patient office visit.

## D.6 Unit II — 3-Mark Questions (T2 · application)

**Q1. Explain the need for data cleaning in clinical datasets.**

*Key point — Human, heterogeneous, time-pressured recording creates five defect classes, and uncleaned data corrupts every downstream step.*

| Defect | Example |
| --- | --- |
| Duplicates | Repeated encounters; one patient under multiple identifiers |
| Unit inconsistency | Glucose in mg/dL vs mmol/L; aggregates become meaningless |
| Impossible values | Data-entry errors, e.g., heart rate 900 bpm |
| Chronology errors | Discharge recorded before admission |
| Text–code mismatch | Same drug spelled six ways vs the coded form |

- **Downstream damage:** outliers dominate scaled models; means computed across mixed units; labels are wrong.
- **Leverage:** cleaning is the first and highest-leverage step of any healthcare ML pipeline.

**Q2. Differentiate data normalization and data imputation.**

*Key point — Normalization is a scaling operation on complete values; imputation is a completion operation on missing ones; apply clean → impute → scale.*

| Aspect | Normalization | Imputation |
| --- | --- | --- |
| Operation type | Scaling | Completion |
| Acts on | Complete numeric values | Missing values |
| Changes | Magnitude, never existence | Existence, not (primarily) scale |
| Methods | Min–max to [0,1]; z-score (mean 0, variance 1) | Mean/median, KNN, MICE, LOCF |
| Example | Creatinine 4.2 mg/dL gets standardized | Other patients' creatinines get estimated |

**Q3. State methods for handling missing values in healthcare datasets.**

*Key point — Choice depends on the missingness mechanism (MCAR/MAR/MNAR) and on the downstream model.*

| Method | When / note |
| --- | --- |
| Deletion (rows/columns) | Only when missingness is tiny and plausibly MCAR |
| Simple imputation | Mean/median/mode; LOCF for short gaps in dense vitals |
| KNN | Imputes from similar patients |
| MICE | Iterative chained regressions; the principled MAR method |
| NaN-aware learners | LightGBM/XGBoost split on missingness directly |
| Missingness indicators | "Was this measured?" — selective ordering is clinical information |
| MNAR strategy | Model the missingness mechanism itself or fix data collection |

**Q4. List the major steps in feature engineering for EHR data.**

*Key point — Eight ordered steps, ending in leakage validation: everything must be computable at prediction time.*

| Step | Action |
| --- | --- |
| 1. Time-zero & window | Define the observation window (e.g., first 24 h predicts rest of stay) |
| 2. Aggregate sources | Labs (last/min/max/mean/slope/abnormal count), vitals, medications |
| 3. Diagnoses | ICD indicators; comorbidity indices (Charlson) |
| 4. Utilization | Prior admissions, ED visits, LOS so far |
| 5. Temporal | Time since event, measurement frequency, seasonality |
| 6. Text-derived | NLP features: smoking status, symptom mentions |
| 7. Missingness & encoding | Indicators; one-hot (low cardinality), embedding/frequency (high) |
| 8. Leakage validation | Everything must be computable at prediction time |

**Q5. State the significance of ICD and CPT coding systems in healthcare AI.**

*Key point — ICD and CPT make records computable and interoperable, but code-based labels carry coding-practice bias.*

**1. ICD — diagnostic labels**

*Key point:* ICD supplies the diagnostic labels that are the backbone of supervised learning in healthcare.
- Cohorts (heart-failure = I50.x)
- Outcome definitions (readmission via a return admission's codes)
- Phenotype definitions

**2. CPT — procedure labels**

*Key point:* CPT records which interventions occurred, enabling intervention-aware models.
- Interventions (echo, catheterization)
- Utilization features

**3. Computability, interoperability, billing**

*Key point:* Shared vocabularies make records computable across institutions and drive billing.
- Same vocabulary across institutions → interoperable data
- They drive billing → claims data available at scale

**4. Caveat**

*Key point:* Codes are assigned for documentation/payment as much as truth.
- They carry coding-practice bias
- Must be stated as proxies, not ground truth

## D.7 Unit II — 5-Mark Questions (T3 · structured explanation)

**Q1. Explain data cleaning, imputation, and normalization techniques used in clinical data.**

*Key point — Cleaning makes data correct, imputation makes it complete, normalization makes it comparable; run clean → impute → scale.*

**1. Cleaning — make data correct**

*Key point:* Cleaning makes the record reflect clinical reality.
- De-duplication of encounters and patients (entity resolution)
- Unit harmonization (glucose mg/dL↔mmol/L ÷/× 18)
- Plausibility rules (physiologic bounds; dates ordered); free text → LOINC/RxNorm; fix chronology across systems

**2. Imputation — classify the mechanism first**

*Key point:* The missingness mechanism determines the method.
- **MCAR:** deletion acceptable
- **MAR:** explained by observed data → KNN or MICE (iterative chained-equation method)
- **MNAR:** depends on the unobserved value itself → model the mechanism (a test not ordered because expected normal)

**3. Imputation — indicators and evaluation**

*Key point:* Selective ordering is clinical signal; evaluate by downstream performance.
- Add missingness indicators ("was this measured?")
- Evaluate imputation by downstream task performance

**4. Normalization — make data comparable**

*Key point:* Choose the scaler by data shape and model.
- **Min–max** to [0,1]: bounded inputs (NNs); sensitive to outliers
- **Z-score** standardization: mean 0/variance 1 — default for SVM/PCA/regularized models
- **Robust scaling** (median/IQR) for skewed labs

**5. Sequence and leakage**

*Key point:* Sequence matters, and scalers must be fit on training data only.
- Order: clean → impute → scale
- Fit scalers on training data only to avoid leakage
- Retain the raw clinical value alongside the scaled one for interpretability

*Takeaway — The three techniques compose as clean → impute → scale, with leakage control and raw-value retention throughout.*

**Q2. Describe methods for handling missing values, outliers, and bias in healthcare datasets.**

*Key point — Classify before acting on each problem: mechanism, origin, and bias type determine the fix, and each must be audited.*

**1. Missing values — mechanisms and methods**

*Key point:* Classify MCAR/MAR/MNAR, then match the method.
- Deletion (rare, tiny fraction); simple fills (median; LOCF only for short vitals gaps)
- Model-based: KNN; MICE for MAR; NaN-aware learners (LightGBM splits on missingness natively)
- Missingness indicators everywhere; for MNAR, model collection or fix it — don't impute blindly

**2. Outliers — detect, then classify**

*Key point:* Detect with statistical and clinical rules, then classify before acting.
- Detect: z-score/IQR rules, isolation forests, physiologic plausibility ranges
- Data-entry errors → correct; physiologically real extremes (heart rate 220 in documented arrhythmia) → keep
- Robust options (RobustScaler, Huber loss) tame the rest; never delete silently without a documented rule

**3. Bias — types**

*Key point:* Bias arises when the training sample differs from the target or measurement differs by group.
- Selection bias: tertiary-hospital sickest vs primary-care target population
- Measurement/collection bias: instruments or practice differ by site, time, or demographic group (pulse oximetry overreading in darker skin)

**4. Bias — mitigations**

*Key point:* Mitigate by design, subgroup evaluation, and documentation.
- Explicit sampling design; stratified subgroup evaluation
- External validation across sites; document the source population in the model card

**5. Interaction and audit**

*Key point:* The three problems interact, so each must be audited, not just automated.
- Bias can hide inside "missingness"
- An outlier rule can itself encode bias

*Takeaway — Mechanism-aware imputation, classified outliers, and bias-audited sampling together make a healthcare dataset trustworthy for ML.*

**Q3. Explain feature engineering techniques for EHR and time-series clinical data.**

*Key point — Engineer clinically meaningful features over an observation window ending before prediction time, with time-zero identical in training and deployment.*

**1. EHR feature families**

*Key point:* Encode demographics, diagnoses, labs, medications, utilization, and text.
- Demographics/admission context (age, sex, admission type); ICD indicators; validated comorbidity summaries (Charlson, Elixhauser)
- Labs: last value, window min/max/mean/std, abnormal counts, slope (rate of change), time-since-last-measurement, missingness indicators
- Medications (high-risk drug indicators, dose, duration); utilization (prior admissions, ED visits, LOS-so-far); NLP text features (smoking status, symptom flags)

**2. Observation window**

*Key point:* All features are computed over a window ending strictly before prediction time.
- Example: first 24 h of data → predict the rest of the stay
- All sources aggregated over the same window

**3. Time-series features**

*Key point:* Summarize dynamics: statistics, variability, trend, morphology, sampling, ratios.
- Window statistics (1 h/6 h/24 h); variability (std, coefficient of variation; **HRV**: RMSSD/SDNN)
- Trends (slope, delta-from-baseline, time-above-threshold); waveform morphology (ECG intervals, EEG band powers)
- Sampling frequency itself; cross-signal ratios (shock index = HR/SBP)

**4. Representation choice**

*Key point:* Choose the representation by data volume and horizon.
- Engineered features + gradient-boosted trees: the robust default
- Raw-sequence RNN/LSTM models: win with abundance and long horizons

**5. Time-zero and leakage**

*Key point:* Define time-zero identically in training and deployment, and audit for leakage.
- Identical time-zero definition in training and deployment
- Every feature must be computable at prediction time

*Takeaway — Feature quality hinges on clinical meaning, a strictly pre-prediction window, and leakage-free time-zero discipline.*

**Q4. Discuss text mining for medical notes using Natural Language Processing (NLP).**

*Key point — Clinical notes hold most clinical knowledge but need a staged pipeline — preprocess, extract, assert, relate, structure — to become usable.*

**1. Why notes are hard**

*Key point:* Notes are written for humans, so keyword search matches a diagnosis's own denial.
- Abbreviations (SOB, NSTEMI); hedging ("cannot exclude"); family-history confusion; imprecise dates; copy-forward bloat
- **Negation:** "no evidence of pneumonia" — a keyword search matches the denial itself

**2. Preprocessing**

*Key point:* Section segmentation matters because assertion differs by section.
- Section segmentation (History/Meds/Assessment/Plan)
- Sentence splitting; abbreviation expansion

**3. Entity extraction (NER)**

*Key point:* Tag clinical concepts with dictionaries or clinical transformers.
- Dictionary/ontology approaches (UMLS, SNOMED)
- Clinical transformers (scispaCy, clinical BERT) for medications, problems, procedures

**4. Assertion detection — the defining step**

*Key point:* Classify each finding as present/absent/possible/historical using context.
- Negation algorithms (NegEx) plus section context
- This is clinical NLP's defining step

**5. Relations, time, and structured output**

*Key point:* Extract relations and timelines, then produce structured outputs.
- Finding-to-anatomy and timeline extraction
- Features (smoking status), codes (ICD auto-assignment), cohort definitions, summaries

**6. Applications and the LLM caveat**

*Key point:* LLMs excel at extraction/summarization but need grounding and PHI safeguards.
- Applications: auto-coding, trial cohort identification, quality measures, feature engineering, report summarization
- LLMs require citable source spans (grounding) and PHI safeguards before hospital deployment

*Takeaway — NLP turns human-facing notes into computable features, with assertion detection as the step that separates presence from mere mention.*

**Q5. Explain ICD and CPT coding systems with their significance in healthcare AI.**

*Key point — ICD and CPT provide the labels, interoperable vocabularies, and claims data behind healthcare ML — but inherit coding-practice bias.*

**1. ICD — structure and uses**

*Key point:* WHO-maintained diagnosis classification serving statistics, reimbursement, epidemiology, and ML labels.
- National clinical modifications (ICD-10-CM) and ICD-11; structure: category code + detail
- Examples: `E11.9` = type 2 diabetes without complications; `I21.4` = acute subendocardial MI
- Serves morbidity/mortality statistics, reimbursement grouping, epidemiology; ML cohorts, outcome labels, phenotype definitions

**2. CPT — structure and uses**

*Key point:* AMA-maintained five-character codes for procedures and services.
- Examples: `99213` office visit, `93306` echocardiogram, `66984` cataract surgery
- Serves billing and utilization analysis; ML procedure labels and intervention features

**3. Significance for AI**

*Key point:* Codes make supervised learning possible at scale and generate healthcare's largest computable dataset.
- The labels that make supervised learning possible; interoperable vocabularies shared across institutions
- They generate the claims data — healthcare's largest computable dataset
- NLP auto-coding turns notes into codes, creating consistent labels cheaply

**4. Significance caveat**

*Key point:* Codes are assigned under documentation and payment incentives.
- Code-based labels carry coding-practice bias
- A model trained on them learns billing behavior alongside biology

**5. Related systems**

*Key point:* ICD/CPT sit inside a family of clinical vocabularies.
- SNOMED CT (findings), LOINC (labs), RxNorm (medications), DRG (payment groups)

*Takeaway — ICD and CPT turn clinical activity into computable labels, and models built on them must be read through the lens of coding-practice bias.*

## D.8 Unit II — 10-Mark Questions (T3 · integrated essay/design)

**Q1. Explain data cleaning, imputation, normalization, and feature engineering techniques used in clinical data, with suitable examples.**

*Key point — A leakage-guarded pipeline of clean → impute → engineer → scale turns messy clinical records into trustworthy model inputs.*

**A. Cleaning**

*Key point:* Make the record reflect clinical reality.
- De-duplication: same encounter twice; entity resolution for patients under multiple IDs
- Unit harmonization: glucose mg/dL↔mmol/L; creatinine mg/dL↔µmol/L
- Plausibility checks: heart rate 900 bpm → data-entry error; discharge before admission → chronology error
- Vocabulary reconciliation: free-text drugs → RxNorm, labs → LOINC; timeline integrity across systems; copy-forward hygiene
- **Example:** a mean glucose computed over mixed units is meaningless until harmonization

**B. Imputation**

*Key point:* Classify the missingness mechanism, then impute accordingly.
- **MCAR:** unrelated to anything — deletion nearly unbiased
- **MAR:** explained by observed variables (sicker patients get more labs)
- **MNAR:** depends on the missing value itself (a test not ordered because expected normal)
- Methods: median/mode fills (baseline); LOCF (short gaps in dense vitals only); KNN (similar patients); MICE (chained regressions — the principled MAR method); NaN-aware learners (LightGBM/XGBoost split on missingness); missingness indicators as features everywhere
- Evaluate imputation by downstream task performance; **example:** absent creatinine in a sepsis model — add "creatinine not drawn in 24 h" as a feature before imputing

**C. Normalization / standardization**

*Key point:* Match the scaler to the model and the data's shape.
- Min–max to [0,1]: bounded inputs (NNs); outlier-sensitive
- Z-score standardization: default for SVM, PCA, regularized regression
- Robust scaling (median/IQR) for skewed clinical labs; clinically meaningful transforms (log for creatinine)
- Fit on training data only
- **Example:** heart rate (60–100) and cholesterol (150–300) need common scaling before k-NN

**D. Feature engineering**

*Key point:* Build clinically meaningful feature families over a pre-prediction observation window.
- EHR families: demographics/admission context; diagnosis features (ICD indicators; Charlson/Elixhauser comorbidity indices)
- Labs: last, min/max/mean/std over window, **slope**, abnormal count, time-since, missingness indicators
- Medications (indicators, dose, duration); utilization (prior admissions, ED visits, LOS-so-far); text-derived (NLP smoking status)
- Time-series families: window statistics; variability (HRV: RMSSD, SDNN); trend (slope, delta-from-baseline); morphology (ECG intervals, EEG band power); sampling frequency; cross-signal ratios (shock index)
- All computed over an observation window ending strictly before prediction time, with time-zero defined identically in training and deployment

**E. Composition**

*Key point:* The pipeline is ordered and leakage-guarded — each stage feeds the next and can silently destroy validity.
- Order: clean → impute (+indicators) → engineer → scale → split by *patient*
- Each stage's output is the next stage's raw material
- Silent failures: fitting a scaler on all data; including a post-decision lab draw
- Every stage needs an explicit leakage audit, not just good intentions

**Synthesis**

- Cleaning, imputation, normalization, and engineering form one ordered pipeline, not four independent chores
- Each technique fixes a concrete clinical failure: mixed-unit glucose, missing creatinine, unscaled vitals, raw signal series
- The pipeline is valid only if leakage-audited at every stage and split by patient

**Q2. Discuss methods for handling missing values, outliers, and bias in healthcare datasets and explain their importance in machine learning.**

*Key point — Mechanism-aware missingness handling, classified outliers, and audited bias are what make a reported AUC mean anything.*

**A. Missing values**

*Key point:* Classify the mechanism, then choose the method.
- **MCAR:** random dropout — deletion acceptable
- **MAR:** explained by observed data — use MICE/KNN
- **MNAR:** the unobserved value causes the missingness (a drug-abuse field empty *because* it is positive)
- Methods: deletion (tiny fractions only); simple fills (median; LOCF for short dense gaps); model-based imputation (KNN, MICE chained equations); NaN-aware learners (LightGBM handles missingness natively); missingness indicators — in the EHR, *what was not measured* is a clinical decision
- Importance: imputation chosen wrongly biases the model; missingness itself often predicts the outcome better than the imputed value

**B. Outliers**

*Key point:* Detect statistically, then act by classification, not reflex.
- Detect: z-score/IQR, isolation forests, physiologic plausibility ranges
- Data-entry errors → correct; true clinical extremes (heart rate 220 in documented SVT; SpO₂ 70 in a coded event) → keep — they are the signal being modeled
- Otherwise: robust scaling/losses
- Importance: outliers dominate variance-based scaling and squared-error training; deleting real extremes removes exactly the cases the model must learn

**C. Bias**

*Key point:* Name the bias type, then mitigate by design, evaluation, and documentation.
- Selection bias: training population ≠ target (tertiary ICU data applied to primary care)
- Measurement bias: instruments/practice differ by group (pulse oximetry overreading SpO₂ in darker skin)
- Label bias: ICD labels shaped by coding practice
- Mitigations: documented sampling design; stratified subgroup evaluation (sensitivity/specificity per demographic); external multi-site validation; model-card documentation of source population
- Importance: bias turns a *statistically* accurate model into an *ethically and legally* defective one (Unit V)

**D. Why this matters for ML**

*Key point:* Every downstream guarantee is conditional on preprocessing.
- Calibration, fairness, and generalizability are all conditional on preprocessing
- A leakage-free, mechanism-aware, bias-audited pipeline is what makes a reported AUC *mean* something

**E. Audit discipline**

*Key point:* Preprocessing deserves the same rigor as modeling — and more.
- For each stage: write the rule, version the dataset
- Test for leakage (time-aware, patient-aware splits)
- Preprocessing is engineering with clinical consequences

**Synthesis**

- The three problems interact: bias can hide inside "missingness", and an outlier rule can encode bias
- Each requires classification before correction, plus documented, auditable rules
- Preprocessing quality — not model choice — underwrites every reported clinical metric

**Q3. Explain data privacy, anonymization, and HIPAA compliance in healthcare AI, and discuss their significance in preprocessing and deployment.**

*Key point — Privacy is engineered across the pipeline: de-identify before data leaves the clinical system and treat every data movement as a compliance decision.*

**A. HIPAA essentials**

*Key point:* HIPAA governs PHI and imposes Privacy, Security, and vendor-agreement duties.
- Health Insurance Portability and Accountability Act (US, 1996); **PHI** = any health data linked to an identifier
- **Privacy Rule:** who may use/disclose PHI; minimum-necessary principle
- **Security Rule:** administrative/physical/technical safeguards for electronic PHI
- **Business Associate Agreements (BAAs)** required with any vendor processing PHI — a cloud ML provider is a legal relationship, not just a service
- GDPR imposes analogous duties in Europe: lawful basis, data-subject rights, DPIAs for high-risk processing

**B. De-identification standards**

*Key point:* HIPAA offers two de-identification routes with a utility–privacy trade-off.
- **Safe Harbor:** remove 18 identifier categories (names, dates finer than year, geography finer than state, contact data, SSN/MRN/device IDs, photos, etc.) with no actual knowledge of re-identification
- **Expert Determination:** a statistician certifies very small re-identification risk; allows keeping more utility (e.g., shifted dates)
- De-identification (identifiers removed, still regulated in some uses) ≠ anonymization (re-identification risk negligible)

**C. Anonymization in pipelines**

*Key point:* Layer practical techniques from pseudonymization to differential privacy.
- Pseudonymization: salted hashes for patient keys, key held separately
- Date-shifting per patient (preserve intervals, obscure absolute dates); k-anonymization for released cohorts (each record indistinguishable from k−1 others on quasi-identifiers like age+zip)
- Suppression/generalization of rare values; free-text scrubbing (NLP-based PHI redaction — names also hide in notes)
- **Differential privacy** for aggregate statistics; federated training at fleet scale (Unit V)

**D. Significance in preprocessing**

*Key point:* Privacy constraints shape what features may exist — design pseudonymization in, don't bolt it on.
- Raw notes scrubbed before feature extraction; dates may only enter as intervals; geography only as state; device identifiers excluded
- De-identification must happen *before* data leaves the clinical system
- Re-identification risk lives in *combinations* of innocuous features (rare diagnosis + age + zip)

**E. Significance in deployment**

*Key point:* Deployment decisions are compliance decisions.
- Where the model runs: on-prem vs cloud + BAA
- What the vendor may retain (model-change and data-retention clauses); access logging; breach notification readiness; retention/deletion policy per data type
- EU: high-risk clinical AI additionally requires transparency, human oversight, and documented governance

**F. Limits**

*Key point:* De-identification trades utility for privacy, and some data cannot be anonymized.
- Strong anonymization can degrade rare-disease models
- Genomic data is inherently identifying — "anonymous genomes" is not a real category
- Durable principle: **minimize, pseudonymize by design, audit re-identification risk, treat every data movement as a compliance decision**

**Synthesis**

- Privacy engineering spans the full lifecycle: collection → de-identification → feature design → deployment contracts
- HIPAA's Safe Harbor / Expert Determination set the floor; GDPR and EU high-risk duties raise the bar for clinical AI
- Audit re-identification risk continuously — risk hides in feature combinations, not single fields

## D.9 Unit III — 2-Mark Questions (T1 · recall)

**Q1. What is supervised learning?**

*Key point — Supervised learning trains a model on labeled input–output pairs so it can predict labels for new, unseen inputs.*

- **Definition:** Trains on labeled examples (inputs X with known outputs y) to predict labels for new, unseen inputs.
- **Healthcare examples:** Predicting 30-day readmission risk; classifying pneumonia vs normal on X-ray.
- **Defining requirement:** A trustworthy label — and in medicine, labels are themselves imperfect measurements.

**Q2. Define unsupervised learning.**

*Key point — Unsupervised learning discovers structure (clusters, densities, anomalies) in unlabeled data without a target variable.*

- **Definition:** Discovers structure in unlabeled data — clusters, densities, anomalies — with no target variable.
- **Healthcare examples:** Clustering diabetes subtypes; detecting anomalous lab patterns; dimensionality reduction for visualization.
- **Role:** Generates hypotheses (patient subtypes) that must then be validated against outcomes.

**Q3. What is a Convolutional Neural Network (CNN)?**

*Key point — A CNN applies learned convolutional filters across an image, building a hierarchy from local patterns to whole-object concepts, matching medical imaging.*

- **Definition:** A deep network applying learned convolutional filters across an image.
- **Mechanism:** Builds a hierarchy from local patterns (edges, textures) to whole objects (lesions, organs); pooling gives spatial summarization.
- **Fit:** Its inductive biases (local patterns matter, translation robustness) match medical imaging — the standard for X-ray/CT/MRI/pathology.

**Q4. What is transfer learning?**

*Key point — Transfer learning reuses representations from a large source task to bootstrap a smaller target task, compensating for medicine's small labeled datasets.*

- **Definition:** Reuses representations learned on a large source task (e.g., ImageNet) as the start for a smaller target task (chest X-ray classification).
- **Mechanism:** Typically replaces the final layer and fine-tunes with a small learning rate.
- **Purpose:** Compensates for medicine's small labeled datasets and speeds convergence; medical-specific pretraining when the domain gap is large.

**Q5. Define sensitivity and specificity.**

*Key point — Sensitivity is the fraction of truly diseased correctly flagged; specificity is the fraction of truly healthy correctly cleared.*

- **Sensitivity (recall, TPR):** TP/(TP+FN) — fraction of truly diseased correctly flagged; the metric when missing disease is the dominant cost.
- **Specificity (TNR):** TN/(TN+FP) — fraction of truly healthy correctly cleared; the metric for avoiding unnecessary follow-up.
- **Example:** Sensitivity 0.95 / specificity 0.90 → 5% of the diseased missed; 10% of the healthy falsely flagged.

## D.10 Unit III — 3-Mark Questions (T2 · application)

**Q1. Differentiate supervised and unsupervised learning in healthcare.**

*Key point — Supervised predicts defined targets from labeled data; unsupervised discovers structure without labels and its outputs are hypotheses to validate.*

| Aspect | Point |
|---|---|
| Supervised | Learns from labeled data to predict known targets |
| Supervised tasks | Diagnostic classification (X-ray → pneumonia); risk prediction (→ 30-day readmission) |
| Supervised dependence | Power depends on label quality and prevalence |
| Supervised evaluation | Sensitivity, specificity, AUC |
| Unsupervised | Finds structure without labels: phenotyping, anomaly detection, dimensionality reduction |
| Unsupervised output | A hypothesis — subtypes must be validated against outcomes unused in clustering |
| Relationship | Unsupervised often generates the labels supervised methods then exploit (phenotype → targeted risk model) |
| When unsupervised first | Labels scarce: rare diseases, new syndromes |

**Q2. State the role of CNNs in medical image analysis.**

*Key point — CNNs are the standard imaging architecture, serving classification, detection, segmentation, triage, and quantification roles.*

| Role | Point |
|---|---|
| Standard architecture | Learned local filters match radiological content |
| (1) Classification | Pneumonia on chest X-ray; arrhythmia as signal-as-image; lesion class in dermoscopy |
| (2) Detection | Localizing nodules, hemorrhages, fractures |
| (3) Segmentation | Tumor/organ outlines (U-Net family) for radiotherapy planning and volumetry |
| (4) Triage | Reprioritizing worklists for studies likely positive |
| (5) Quantification | Biomarker scoring (e.g., coronary calcium) |
| Enabling trick | With transfer learning, specialist-level performance on datasets of thousands |

**Q3. Explain the purpose of transfer learning in healthcare AI.**

*Key point — Transfer learning imports a pretrained backbone and adapts it, because medical labeled datasets are too small to train deep networks from scratch.*

**1. The problem it solves**

*Key point:* Medical labeled datasets are small, expensive, and privacy-constrained.
- Thousands, not millions, of examples; training from scratch overfits and wastes the representation.

**2. Mechanism**

*Key point:* Import a pretrained backbone, add a task head, and fine-tune gently.
- Backbone: ImageNet or medical-image self-supervised pretraining; low-level filters (edges, textures) are universal across imaging domains.
- Add task-specific head; fine-tune with a small learning rate, optionally unfreezing deeper layers as data allows.

**3. Benefits**

*Key point:* Better performance with far less data.
- Higher accuracy at small n; faster convergence; less overfitting.

**4. Limits**

*Key point:* Domain gap and validation obligations remain.
- Domain gap: photographs ≠ radiographs; natural images ≠ whole-slide pathology stains.
- Does not substitute for external validation of the fine-tuned model.

**Q4. Define sensitivity, specificity, and AUC.**

*Key point — Sensitivity and specificity are threshold-dependent confusion-matrix rates; AUC-ROC is a threshold-independent ranking summary.*

**1. Sensitivity**

*Key point:* How many of the truly positive are detected.
- TP/(TP+FN) — recall on the diseased.

**2. Specificity**

*Key point:* How many of the truly negative are correctly cleared.
- TN/(TN+FP); both rates depend on the chosen threshold.

**3. AUC (AUC-ROC)**

*Key point:* Area under the ROC curve — threshold-independent.
- ROC plots sensitivity vs 1−specificity across all thresholds.
- Equals P(random positive ranked above random negative).

**4. Caveat**

*Key point:* At low prevalence, AUC-ROC flatters — AUPRC is more honest (Ch. 19).

**Q5. State two techniques for handling imbalanced healthcare datasets.**

*Key point — Cost-sensitive learning and resampling rebalance the minority class, with real-data collection as the clinically strongest fix.*

| Technique | Point |
|---|---|
| (1) Cost-sensitive learning | Weight minority class (`class_weight`/`scale_pos_weight` ≈ N_neg/N_pos) or focal loss |
| Threshold move | Shift decision threshold by clinical cost, not F1 |
| (2) Resampling | Undersample majority, or oversample/SMOTE minority |
| Clinical caveat | Interpolated SMOTE "patients" may be implausible |
| Stronger fix | Real-data collection: registries, multi-site pooling, active learning |
| Also acceptable | Anomaly pre-screening + supervised classification; evaluate via AUPRC/precision@k |

## D.11 Unit III — 5-Mark Questions (T3 · structured explanation)

**Q1. Explain supervised and unsupervised learning techniques used in healthcare.**

*Key point — Supervised learning predicts defined targets under label-quality and leakage discipline; unsupervised learning discovers subtypes and anomalies whose outputs are hypotheses validated against outcomes.*

**1. Supervised — diagnostic classification**

*Key point:* Learn patient/image → condition from labeled cases.
- Model ladder: logistic regression baselines (interpretable, calibrated); gradient-boosted trees on tabular EHR features (strong default); CNNs on images; sequence models on signals.

**2. Supervised — risk prediction**

*Key point:* Define time-zero, build leakage-free features, and evaluate at the operating point.
- Time-zero defined (admission; first abnormal vital); features over an observation window ending before prediction time.
- Patient-level splits; labels from ICD/clinical criteria.
- Evaluation: AUROC/AUPRC + calibration at the operating point.
- Dominated by label quality and leakage discipline.

**3. Unsupervised — clustering / phenotyping**

*Key point:* Discover patient subtypes as hypotheses validated against unused outcomes.
- Methods: k-means, hierarchical, GMM on engineered features.
- Example: the five-type diabetes clustering validated on future complications.
- Validation criteria: unused outcomes and clinical actionability.

**4. Unsupervised — anomaly detection and dimensionality reduction**

*Key point:* Score distance from normal; novelty is not pathology.
- Isolation forests/autoencoders for data-quality surveillance and unusual-pattern flagging.
- Triage of flags is mandatory.
- PCA/UMAP for visualization and preprocessing.

**5. Relationship and choice**

*Key point:* Supervised answers "predict this defined y"; unsupervised answers "what structure exists".
- Rare diseases and new syndromes → unsupervised first.
- Well-defined targets with adequate labels → supervised directly.

*Takeaway — Choose by the question: defined targets with labels go supervised; scarce labels and unknown structure go unsupervised, with validation discipline either way.*

**Q2. Describe CNNs and transfer learning for medical image analysis.**

*Key point — CNNs match medical imaging via local-filter and translation biases, and transfer learning makes them feasible on small clinical datasets — with external validation and attention checks required.*

**1. CNN mechanics**

*Key point:* Stacked conv+pooling layers build a feature hierarchy matched to radiological content.
- Filters slide across the image producing feature maps: edges → textures → structures → findings.
- Inductive bias: local patterns matter; position matters less — a nodule can be anywhere.

**2. Task heads**

*Key point:* The head determines the imaging task.
- Softmax classification; object-detection heads for localization.
- Encoder–decoder (U-Net) for segmentation.

**3. Transfer learning recipe**

*Key point:* Pretrain on a large source, re-head, then fine-tune gently.
- (1) Pretrained backbone (ResNet/EfficientNet/ViT on ImageNet, or self-supervised medical pretraining when the domain gap is large); (2) replace head for the clinical task.
- (3) Fine-tune with a small learning rate, progressively unfreezing deeper layers.
- (4) Augment with clinically valid invariances only — never laterality-changing flips.
- (5) Evaluate per-finding with AUPRC at clinically chosen operating points.
- Rationale: medical datasets are small and privacy-bound; training from scratch overfits.

**4. Examples**

*Key point:* Transfer learning enabled landmark clinical imaging systems.
- **Example:** Dermatologist-level lesion classification (Esteva 2017).
- **Example:** CheXNet-style pneumonia detection; IDx-DR autonomous retinopathy screening (FDA-authorized 2018).

**5. Honesty requirements**

*Key point:* Prove the model works beyond its training setting and looks at the right things.
- External validation on a different hospital/scanner population.
- Per-subgroup metrics.
- Grad-CAM attention checks — model looks at the lesion, not pacemakers or lateral markers.

*Takeaway — CNN architecture plus transfer learning delivers clinical imaging AI, but only with external validation, subgroup metrics, and attention verification.*

**Q3. Explain Recurrent Neural Networks (RNNs) for time-series clinical data.**

*Key point — Gated recurrent architectures (LSTM/GRU) model irregular clinical sequences for deterioration prediction and anomaly scoring, provided time-aware, leak-free discipline is maintained.*

**1. Clinical data setting**

*Key point:* Clinical data is sequential and irregular.
- Vitals, labs, medications, and events over hours.

**2. Plain RNNs**

*Key point:* They carry a hidden state forward but forget.
- Vanishing gradients limit long-range memory.

**3. LSTMs and GRUs**

*Key point:* Gated cell states preserve long trajectories; GRUs are the compute-friendly simplification.
- Forget gate drops stale context; input gate writes new evidence; output gate exposes what matters now.
- Example: a 36-hour rising creatinine trajectory stays in memory long enough to matter.
- GRU: two gates.

**4. Task patterns**

*Key point:* Three recurrent task families cover most clinical uses.
- (1) Sequence classification: first-N-hours window → deterioration/sepsis probability, using time-since-last-measurement inputs and channel masks for absent streams.
- (2) Next-step prediction: trained on benign trajectories, surprise = −log P(next value) yields unsupervised anomaly scores.
- (3) Waveform modeling.

**5. Practical discipline**

*Key point:* Prevent temporal leakage and handle irregularity explicitly.
- Pad/pack sequences; out-of-time validation splits.
- Unidirectional models in deployment — no future peeking.
- Watch for the model keying on absolute timestamps.

**6. Transformers vs recurrence**

*Key point:* Attention replaces recurrence and wins with abundant data, but small recurrent baselines stay competitive.
- Transformers: stronger long-range modeling with data.
- Start recurrent, escalate deliberately.

*Takeaway — LSTMs/GRUs remain the pragmatic default for irregular clinical time series, with time-aware encodings and out-of-time validation as non-negotiable discipline.*

**Q4. Explain model evaluation metrics such as sensitivity, specificity, and AUC.**

*Key point — Confusion-matrix rates, threshold-independent curves, and calibration each answer a different clinical question: choose the metric the decision needs.*

**1. Confusion-matrix rates**

*Key point:* Sensitivity, specificity, precision, and NPV each condition on a different row.
- Sensitivity (recall, TPR) = TP/(TP+FN) — of the diseased, fraction caught; the screening-critical metric.
- Specificity (TNR) = TN/(TN+FP) — of the healthy, fraction correctly cleared.
- Precision (PPV) = TP/(TP+FP) — of the flagged, fraction truly positive; prevalence-dependent, decisive when follow-up is costly.
- NPV = TN/(TN+FN) — reliability of a negative.

**2. Summaries and their limits**

*Key point:* F1 balances precision and recall; accuracy fails under imbalance.
- F1: harmonic mean of precision and recall — report with its pair.
- Accuracy is misleading when classes are imbalanced.

**3. ROC and AUC-ROC**

*Key point:* Threshold-independent ranking summary.
- ROC curve: TPR vs FPR over thresholds.
- AUC-ROC = P(random positive ranked above random negative).

**4. PR curve and AUPRC**

*Key point:* The honest ranking metric at low prevalence.
- The base-rate trap: ROC 0.999 at 0.1% prevalence can still drown the clinic in false positives.

**5. Deployment reporting**

*Key point:* Deploy on more than a headline metric.
- Confusion matrix at the clinically chosen operating point.
- Calibration (predicted vs observed frequencies); per-subgroup metrics.

**6. Choosing the metric**

*Key point:* Match the metric to the decision.
- Sensitivity for screening; PPV for follow-up burden; calibration for automated action.

*Takeaway — No single metric suffices: screening wants sensitivity, follow-up economics want PPV, automated action wants calibration, and low prevalence demands AUPRC.*

**Q5. Describe techniques for handling imbalanced healthcare datasets.**

*Key point — Attack imbalance at the data, cost, algorithm, and evaluation levels, and report prevalence, operating point, and absolute numbers so fragility is visible.*

**1. Quantify first**

*Key point:* Know the base rate before choosing tactics.
- Rare diseases run 1:1,000–1:100,000; accuracy is meaningless.
- Plain losses make "all negative" optimal.

**2. Data-level**

*Key point:* Resample — but real positives beat synthetic ones.
- Undersample the majority; oversample the minority; SMOTE (interpolated synthetic patients — sometimes clinically implausible; caution).
- Strongest fix: more true positives — registries, multi-site pooling, active learning on the uncertain band.

**3. Cost-level**

*Key point:* Rebalance the loss and set the threshold by clinical cost.
- Class weights (pos_weight ≈ N_neg/N_pos); focal loss ((1−p_t)^γ focusing on hard cases).
- Threshold selection by clinical cost — pick the operating point from the clinic's false-alert budget; usually the highest-ROI intervention.

**4. Algorithm-level**

*Key point:* Use imbalance-aware architectures and pipelines.
- Balanced ensembles.
- Anomaly pre-screening → supervised classification on flagged cases.

**5. Evaluation-level**

*Key point:* Rank and report with imbalance-appropriate metrics.
- AUPRC and precision@k instead of ROC/accuracy.
- Confusion matrix at the chosen operating point with absolute numbers (small-denominator fragility: "1 of 3 positives caught at 500 FP per 10,000").
- Per-subgroup metrics; calibration.

**6. Reporting discipline**

*Key point:* Publish prevalence, operating point, and uncertainty.
- Proportions alone hide fragility on small positive counts.

*Takeaway — Imbalance is a lifecycle problem: collect real positives, weight the loss, choose the operating point by clinical cost, and report absolute numbers.*

## D.12 Unit III — 10-Mark Questions (T3 · integrated essay/design)

**Q1. Explain supervised and unsupervised learning techniques used in healthcare and compare their applications.**

*Key point — Supervised learning delivers predictions under label and leakage discipline, unsupervised learning delivers understanding under validation discipline, and mature healthcare ML chains the two.*

**A. Supervised learning**

*Key point:* Two canonical tasks — present-state classification and future-event prediction — governed by clinical pipeline discipline.
- Tasks: **diagnostic classification** (pneumonia on X-ray; rhythm on ECG); **risk prediction** (30-day readmission; 12-hour deterioration).
- Pipeline discipline: define cohort and **time-zero**; labels from ICD/clinical criteria with audited gold standard; features over an observation window ending *before* prediction time (Unit II); **split by patient**.
- Model ladder: logistic regression (interpretable, calibrated baseline) → gradient-boosted trees (tabular default) → deep nets (raw images/signals).
- Evaluate: AUROC/AUPRC, calibration curves, per-subgroup breakdowns; calibrate (isotonic/Platt) before the score drives action.
- Failure modes: leakage (post-decision labs/codes; all-data scaling), dataset shift across hospitals, label noise.

**B. Unsupervised learning**

*Key point:* Structure from X alone — phenotyping, anomaly detection, and dimensionality reduction — with outputs treated as hypotheses.
- Clustering/phenotyping: k-means, hierarchical, GMM on engineered features; landmark example — five-subtype clustering of new-onset diabetes with different complication trajectories, validated against outcomes *not used in clustering*.
- Anomaly detection: isolation forests, one-class SVMs, autoencoders scoring distance-from-normal; data-quality surveillance and unusual-pattern flagging.
- Standing caveat: novelty ≠ pathology — benign newness (new protocols, devices) dominates false alarms; flags go to clinical triage.
- Dimensionality reduction: PCA for preprocessing/visualization; UMAP for structure display.
- Output discipline: unsupervised results are *hypotheses* requiring outcome-based validation.

**C. Comparison**

*Key point — The paradigms differ in requirements, tasks, evaluation, applications, and risks.*

| Dimension | Supervised | Unsupervised |
|---|---|---|
| Requires | Trustworthy labels | Only features (+ careful validation) |
| Typical task | Diagnose / predict defined event | Discover subtypes / flag anomalies |
| Evaluation | Sens/spec/AUC/calibration vs truth | Cluster validity vs unused outcomes; actionability |
| Examples | Readmission, sepsis, retinopathy screening | Diabetes phenotypes, ICU data-quality surveillance |
| Main risk | Leakage, shift, label noise | Interpreting artifacts as discoveries |

**D. Composition**

*Key point:* The paradigms chain into pipelines.
- Unsupervised phenotyping defines subtypes → supervised models trained per subtype.
- Anomaly detection prioritizes cases → clinicians label them → supervised models learn from the labels (active learning).
- Rare diseases: typically unsupervised-first.

**Synthesis**

*Key point:* Use both paradigms deliberately.
- Supervised delivers *predictions* under label and leakage discipline.
- Unsupervised delivers *understanding* under validation discipline.
- Know which question you are asking before choosing.

**Q2. Describe CNNs, transfer learning, and RNNs for medical image analysis and time-series clinical data.**

*Key point — CNNs and transfer learning own spatial data, RNNs/LSTMs own temporal data, and the strongest clinical systems fuse both under shared leakage-free, calibrated, per-subgroup discipline.*

**A. CNNs for medical images**

*Key point:* Learned local filters and translation robustness match radiographs and histology.
- Filters learn local patterns; pooling builds spatial hierarchy.
- Tasks: classification (pneumonia, retinopathy grade), detection (nodules, hemorrhage), segmentation (U-Net: tumor/organs for radiotherapy), quantification (coronary calcium).
- Honest evaluation: per-finding AUPRC, external validation on a different scanner/hospital population, per-subgroup metrics.
- Grad-CAM checks that the model attends to the lesion.

**B. Transfer learning**

*Key point:* Pretrained backbones make deep imaging AI feasible at clinical dataset sizes.
- Rationale: medical labels are scarce, expensive, and privacy-bound.
- Recipe: pretrained backbone (ImageNet ResNet/EfficientNet/ViT — low-level filters transfer; medical self-supervised pretraining where the gap is large) → new task head → fine-tune with small LR, progressively unfreezing.
- Clinically valid augmentation only; external validation.
- Examples: dermatologist-level lesion classification, CheXNet, IDx-DR (FDA-authorized autonomous screening).

**C. RNNs/LSTMs for clinical time series**

*Key point:* Gated cell states preserve long, irregularly sampled trajectories.
- Vitals/labs/events arrive irregularly over hours; the gated cell state (forget/input/output) keeps e.g. a 36-hour rising creatinine in context.
- Sequence classification: first-N-hours → deterioration probability, with time-aware encodings and channel masks.
- Next-step prediction: surprise = −log P(next) for unsupervised anomaly scoring; waveform tasks.
- Discipline: out-of-time validation; unidirectional models in production; explicit handling of missing channels.

**D. Shared discipline**

*Key point:* Both model families demand the same rigor.
- Leakage-free time-zeroed features.
- Patient-level (and out-of-time) splits.
- Calibration before scores drive actions; per-subgroup reporting.
- Monitoring for drift after deployment.

**E. When each wins**

*Key point:* Match architecture to data geometry.
- CNNs + transfer learning own *spatial* data (images).
- RNN/LSTM — and increasingly transformers — own *temporal* data (trajectories, waveforms).

**Synthesis**

*Key point:* The strongest clinical systems are multi-modal.
- An imaging CNN and an EHR/LSTM trajectory model fused for the same decision — multi-modal medicine (Unit IV).
- Shared discipline (leakage control, calibration, subgroup reporting) makes the fusion trustworthy.

**Q3. Explain model evaluation metrics such as sensitivity, specificity, and AUC, and discuss techniques for handling imbalanced healthcare datasets and interpreting models using LIME and SHAP.**

*Key point — Metrics make the claim, imbalance handling makes the claim honest, and LIME/SHAP make the claim usable by the clinician who must act on it.*

**A. Metrics**

*Key point:* Confusion-matrix rates, threshold-independent curves, and calibration each serve a different clinical question.
- Sensitivity = TP/(TP+FN) — of the truly diseased, fraction flagged; screening-critical because a missed case is the dominant cost.
- Specificity = TN/(TN+FP) — of the healthy, fraction cleared; guards unnecessary follow-up.
- Precision/PPV = TP/(TP+FP) — of those flagged, fraction truly positive; prevalence-dependent. NPV = TN/(TN+FN). F1 — harmonic mean of precision and recall.
- ROC curve and AUC-ROC (probability a random positive outranks a random negative); PR curve and AUPRC — honest at low prevalence (base-rate trap: at 0.1% prevalence, ROC 0.999 can still mean unusable precision).
- For deployment: confusion matrix at the chosen operating point, calibration curves/Brier, per-subgroup metrics.

**B. Imbalance handling**

*Key point:* Attack imbalance at the data, cost, algorithm, and evaluation levels.
- Rare diseases run 1:1,000–1:100,000: accuracy collapses; plain losses make "all negative" optimal.
- Data-level: undersampling, oversampling, SMOTE (clinical-plausibility caution); strongest — more *real* positives (registries, multi-site pooling, active learning).
- Cost-level: class weights (pos_weight ≈ N_neg/N_pos), focal loss, threshold selection by clinical cost (usually the highest-ROI fix).
- Algorithm-level: balanced ensembles; anomaly pre-screening → supervised classification.
- Evaluation-level: AUPRC/precision@k, absolute confusion-matrix numbers (small-denominator fragility), per-subgroup metrics, calibration.

**C. LIME and SHAP**

*Key point:* Both explain predictions locally, with different mechanisms and guarantees — and attribution is not causation.
- **LIME:** perturbs the instance, weights neighbors by proximity, fits a sparse linear surrogate; its coefficients are the local explanation.
- LIME: model-agnostic and intuitive; unstable across perturbation seeds; only locally faithful.
- **SHAP:** Shapley values — each feature's average marginal contribution across coalitions; local accuracy (values sum to the prediction) and consistency.
- SHAP: **TreeSHAP** is fast/exact for tree ensembles; global summaries (mean |SHAP|) give feature importance.
- In imaging, Grad-CAM/saliency maps play the same role.
- Standing caveat: attribution is not causation — "HbA1c pushed the score" is not "HbA1c caused the risk".

**D. Integrated evaluation report for a deployed clinical model**

*Key point:* One report should combine prevalence, discrimination, calibration, subgroup performance, explanations, and external validation.
- (1) Prevalence and cohort definition; (2) AUROC + AUPRC; (3) confusion matrix at the clinical operating point with absolute numbers.
- (4) Calibration plot and Brier score; (5) per-subgroup sensitivity/specificity.
- (6) Per-patient explanation artifacts: top SHAP pushers/suppressors, similar cases, counterfactual.
- (7) External-validation results and stated limitations.

**Synthesis**

*Key point:* The three components are complementary, not interchangeable.
- Metrics make the claim.
- Imbalance handling makes the claim *honest*.
- LIME/SHAP make the claim *usable* by the clinician who must act on it.

## D.13 Unit IV — 2-Mark Questions (T1 · recall)

**Q1. Name any two diseases where AI assists in diagnosis.**

*Key point — AI already assists diagnosis in retinopathy and heart disease, with several other accepted examples.*

- **Diabetic retinopathy:** CNNs grade retinal photographs; IDx-DR was the first FDA-authorized autonomous diagnostic AI (2018).
- **Coronary/heart disease:** deep ECG models classify arrhythmias; AI estimates ejection fraction from echocardiography.
- **Also acceptable:** cancer (mammography/lung-CT/pathology); pneumonia on chest X-ray; skin-lesion classification in dermatology.

**Q2. What is predictive modelling in healthcare?**

*Key point — training statistical/ML models on historical patient data to predict future clinical outcomes.*

- **Definition:** statistical/ML models trained on historical patient data predict future outcomes — e.g., 30-day readmission, ICU deterioration within 12 h, in-hospital mortality, remaining length of stay.
- **Requirements:** defined time-zero, leakage-free features (Unit II), clinically calibrated probabilities at the operating point.

**Q3. What is personalized medicine?**

*Key point — tailoring care to each patient's molecular/genomic profile, environment, and history rather than population averages.*

- **Definition:** personalized (precision) medicine tailors prevention, diagnosis, and treatment to the individual patient's molecular/genomic profile, environment, and history.
- **AI enablers:** interpreting genomic variants (tumor sequencing → targeted therapy); polygenic risk scores for screening stratification; predicting individual drug response (pharmacogenomics).

**Q4. What is AI-based drug discovery?**

*Key point — applying machine learning across the drug-development pipeline to narrow the search before expensive validation.*

- **Definition:** machine learning applied across the drug-development pipeline.
- **Entry points:** target identification from omics/literature; virtual screening of compound libraries by predicted binding; generative models proposing novel candidate molecules; QSAR property prediction (potency, solubility, toxicity).
- **Honest value:** narrowing the search before expensive wet-lab and clinical validation — baricitinib's COVID-19 nomination is a real example.

**Q5. Define a virtual health assistant.**

*Key point — a conversational AI agent for patient/clinician support that triages and routes but never diagnoses.*

- **Definition:** a conversational AI agent (chatbot or voice assistant) supporting patients or clinicians.
- **Functions:** triage and routing, medication reminders, chronic-disease coaching, post-discharge follow-up, administrative tasks.
- **Limits:** a support/triage tool — not a diagnostician; must carry conservative, rule-based escalation ("red flag → seek care now") and PHI safeguards.

## D.14 Unit IV — 3-Mark Questions (T2 · application)

**Q1. State AI applications in the diagnosis of diabetes, cancer, and heart disease.**

*Key point — each disease has applications spanning screening, risk prediction, and treatment matching.*

| Disease | Application |
| --- | --- |
| Diabetes | Retinopathy screening from retinal photographs (IDx-DR — autonomous when confident) |
| Diabetes | Nephropathy risk from EHR lab trajectories |
| Diabetes | CGM glucose forecasting for insulin management |
| Cancer | Mammography screening support; lung-CT nodule detection |
| Cancer | Whole-slide pathology — metastasis detection, Gleason grading |
| Cancer | Precision oncology: tumor genomics matched to targeted therapy |
| Heart disease | Deep 12-lead ECG rhythm classification at cardiologist level |
| Heart disease | AI estimation of ejection fraction from echo |
| Heart disease | Automated coronary calcium scoring on CT; wearable PPG AF screening |

**Q2. List the medical imaging modalities used in AI-based analysis.**

*Key point — nine standard modalities feed AI analysis, all DICOM-standardized with modality-specific protocols.*

| Modality | Typical AI use |
| --- | --- |
| X-ray/radiography | Chest screening, fractures |
| CT | Hemorrhage triage, lung nodules, coronary calcium |
| MRI | Brain tumor segmentation, MS lesions |
| Ultrasound | Obstetric, cardiac/echo |
| Whole-slide pathology | Grading, metastasis detection |
| Mammography | Screening |
| Retinal fundus photography | Retinopathy |
| OCT | Retinal layers |
| Nuclear medicine/PET | Oncology |

- All are DICOM-standardized; each modality implies its own preprocessing, augmentation, and evaluation protocol.

**Q3. Explain predictive modelling for ICU admission and mortality risk.**

*Key point — ICU admission prediction is a sensitivity-first triage task; mortality prediction pairs transparent classical scores with locally validated learned models.*

**1. ICU admission prediction**

*Key point:* a triage task in the emergency ward predicting who will need ICU-level care.
- Features: triage vitals, initial labs, demographics, comorbidities.
- Supports bed planning and escalation; operating point set by bed capacity.
- Evaluation favors sensitivity — missed escalations are catastrophic.

**2. Mortality prediction**

*Key point:* classical severity scores versus learned trajectory models.
- Classical: APACHE II/III, SAPS II — transparent, fixed features measured in the first 24 h.
- Learned: GBMs/LSTMs over full trajectories — higher AUROC, but calibration and local validation are mandatory.

**3. Shared discipline**

*Key point:* both tasks must respect time-zero, exclude artifacts, and report calibration.
- Time-zero = ICU admission; exclude post-death artifacts; split by patient.
- Report calibration — a mortality score drives goals-of-care conversations, not just alerts.

**Q4. State the role of AI in genomics and personalized medicine.**

*Key point — AI turns each patient's molecular data into actionable clinical recommendations, within equity limits.*

**1. Genomics**

*Key point:* ML assists the sequencing pipeline from reads to structure.
- Variant calling from sequencing reads; pathogenic/benign classification (AlphaMissense-style conservation+structure models).
- Gene-expression signature interpretation; AlphaFold protein-structure prediction enables structure-based drug design.

**2. Precision oncology**

*Key point:* tumor–normal sequencing identifies actionable drivers matched to targeted therapy.
- EGFR mutation → inhibitors; MSI-high → immunotherapy.

**3. Pharmacogenomics**

*Key point:* genotypes guide drug choice and dosing.
- CYP2D6, CYP2C19, HLA-B*57:01 genotypes steer selection and dosing.

**4. Polygenic risk scores**

*Key point:* PRSs stratify screening intensity for common diseases.

**5. Standing limits**

*Key point:* ancestry transferability and equity remain the constraints on these tools.

**Q5. List applications of chatbots and virtual health assistants in healthcare.**

*Key point — six application areas, all bounded by triage-scope, safety, and escalation constraints.*

| Application | Role |
| --- | --- |
| Symptom triage and routing | Structured questioning directs to self-care, primary, or emergency care; conservative red-flag escalation |
| Medication management | Reminders and adherence support |
| Chronic-disease coaching | Diabetes/hypertension education, lifestyle tracking |
| Post-discharge follow-up | Check-ins that catch deterioration early |
| Administrative support | Scheduling, refills, pre-visit intake, wayfinding |
| Clinician-facing assistants | Drafting notes, answering guideline queries |

- Constraints in all cases: triage/support scope (not diagnosis), PHI-safe logging, audited escalation logic.
- For LLM agents: grounding plus out-of-scope refusal.

## D.15 Unit IV — 5-Mark Questions (T3 · structured explanation)

**Q1. Explain AI applications in disease diagnosis for diabetes, cancer, and heart disease.**

*Key point — each disease contributes a flagship autonomous or high-throughput application, and shared design rules govern all three.*

**1. Diabetes — retinopathy screening flagship**

*Key point:* CNNs grade fundus photographs, and IDx-DR made the decision autonomous by staying narrow.
- IDx-DR (FDA-authorized 2018): when confidence exceeds thresholds it issues the *autonomous* referral decision without a physician reading the image.
- Explicit re-image/refer fallbacks — the template for narrow, conservative autonomous AI.
- Companion tasks: nephropathy prediction from lab trajectories; CGM-based glucose forecasting for insulin control.

**2. Cancer — screening**

*Key point:* AI supports radiologist-level screening with reduced workload.
- Mammography AI (large trials: AI-supported reading matches double reading with reduced workload).
- Lung-CT nodule detection.

**3. Cancer — pathology and treatment**

*Key point:* whole-slide analysis grades disease while precision oncology and auto-contouring plan treatment.
- Whole-slide analysis: lymph-node metastasis and Gleason grading; stain/scanner variability is the central engineering problem.
- Precision oncology matches tumor genomics to targeted therapy; radiotherapy auto-contouring is routinely deployed.
- Evaluation leans on intermediate endpoints (biopsy-confirmed detection) because recurrence ground truth takes years.

**4. Heart disease**

*Key point:* deep models match cardiologists on ECG and automate cardiac imaging measurements.
- Deep 12-lead ECG models classify dozens of rhythms at cardiologist level.
- Echo AI estimates ejection fraction; CT coronary-calcium scoring is automated.
- Wearables screen for atrial fibrillation from single-lead PPG (Apple Heart Study).

**5. Cross-cutting design lessons**

*Key point:* claim grade, operating point, and post-flag pathway decide clinical value.
- Define screening-grade vs diagnostic-grade claims.
- Choose the operating point by clinical cost.
- Design what happens *after* the flag.

*Takeaway — across diabetes, cancer, and heart disease, successful diagnostic AI pairs a narrowly defined task with conservative operating points and an explicit post-flag pathway.*

**Q2. Describe AI techniques used in X-ray, MRI, and CT scan analysis.**

*Key point — CNNs classify and detect, volumetric and multi-sequence models handle 3-D data, and shared validation disciplines make results trustworthy.*

**1. X-ray**

*Key point:* CNN classification/detection with worklist triage, guarded against shortcut learning.
- Tasks: pneumonia, pneumothorax, consolidation, fractures; worklist triage.
- Training on tens of thousands of labeled studies; per-finding AUPRC and external validation.
- Pitfalls: shortcut learning from lateral markers, drains, device artifacts (attention checks via Grad-CAM).

**2. CT**

*Key point:* 3-D volumetric CNNs triage hemorrhage and quantify nodules, calcium, and infarcts.
- Intracranial-hemorrhage triage (reprioritizing worklists); lung-nodule detection in screening CT.
- Coronary-calcium quantification; stroke infarct segmentation for thrombectomy decisions.
- Preprocessing: windowing (bone/brain windows), slice resampling.

**3. MRI**

*Key point:* multi-sequence 3-D segmentation with sequence-aware fusion and site harmonization.
- U-Net/nnU-Net segmentation: brain tumors (BraTS benchmark), MS lesion counting, cardiac structure/function.
- Sequences (T1, T2, FLAIR) are modalities-in-miniature requiring sequence-aware fusion.
- Acquisition-site variability (magnets, protocols) demands harmonization or domain adaptation.

**4. Common disciplines across all three**

*Key point:* data hygiene, plausible augmentation, and external validation are universal.
- DICOM metadata hygiene; augmentation within anatomical plausibility.
- External validation across sites; per-finding/subgroup reporting.

*Takeaway — the modality changes the architecture and preprocessing, but credibility always comes from the same external-validation disciplines.*

**Q3. Explain predictive modeling for ICU admission and mortality risk prediction.**

*Key point — ICU admission prediction is sensitivity-first triage, mortality prediction layers learned models over transparent classical scores, and both demand leakage-free, calibrated deployment.*

**1. ICU admission prediction — task and data**

*Key point:* predict, in the ED/ward, who will need ICU-level care within a horizon.
- Data: triage vitals, initial labs, demographics, comorbidity indices, utilization history (Unit II features).
- Features engineered over the observation window ending at prediction time.

**2. ICU admission prediction — modeling and evaluation**

*Key point:* GBMs or LSTMs on early trajectories, evaluated sensitivity-first and integrated into workflow.
- Label = ICU transfer within N hours; models: gradient-boosted trees or LSTM.
- Evaluation: sensitivity at capacity-relevant specificity (missed escalations dominate cost).
- Calibration for bed-planning use; per-shift workflow integration (Chapter 3's five rights).

**3. Mortality — classical severity scores**

*Key point:* APACHE II/III and SAPS II are the transparent, externally calibrated floor.
- Fixed features measured in the first 24 h.
- Transparent and multi-site calibrated across ICUs.

**4. Mortality — learned models**

*Key point:* GBM/LSTM trajectory models add discrimination but must prove local calibration first.
- Continuous data yields higher AUROC.
- Local calibration must be demonstrated before deployment.
- Explanation artifacts for clinicians — mortality output drives goals-of-care conversations, not merely alerts.

**5. Shared discipline**

*Key point:* time-zero, artifact exclusion, patient-level splits, and calibration reporting apply to both.
- Define time-zero (ICU admission); exclude **post-death artifacts** (labs/vitals generated by the dying process leak the label).
- Split by patient; report calibration with per-subgroup breakdowns.

**6. Deployment pattern**

*Key point:* scores as the transparent floor, learned models layered where locally validated.
- Classical scores anchor transparency; learned models add discrimination where validated.

*Takeaway — a mortality or escalation score changes conversations and beds, so transparent baselines, leakage-free labels, and proven local calibration are non-negotiable.*

**Q4. Discuss the role of AI in genomics and personalized medicine.**

*Key point — AI acts at every genomics stage from variant calling to structure prediction, then converts molecular data into actionable oncology, pharmacogenomic, and risk-stratification decisions within known limits.*

**1. Genomics pipeline and AI's entries**

*Key point:* sequencing → FASTQ → alignment (BAM) → variant calling (VCF), with AI entering at calling, interpretation, signatures, and structure.
- **Variant calling:** deep-learning callers rival classical tools, especially on indels.
- **Variant interpretation:** pathogenicity classified from conservation, predicted protein effect, population frequency.
- **Expression/omics signatures** for disease and drug response.
- **Structure prediction:** AlphaFold 2 (2021) enables structure-based drug design.

**2. Precision oncology**

*Key point:* tumor–normal sequencing finds somatic drivers, matched to therapies by decision support.
- EGFR mutation → EGFR inhibitor; BRAF V600E → BRAF inhibitor; MSI-high → immunotherapy.
- AI adds variant prioritization, biomarker extraction from routine H&E slides (predicting genotype from morphology), and trial matching.

**3. Pharmacogenomics**

*Key point:* genotypes directly guide drug selection and dosing.
- CYP2D6/CYP2C19 genotypes guide clopidogrel/codeine/tamoxifen.
- HLA-B*57:01 screening prevents abacavir hypersensitivity.
- AI dosing models combine genotype with clinical covariates.

**4. Polygenic risk scores**

*Key point:* weighted sums of common variants stratify screening — with an equity caveat.
- Stratify screening for common diseases.
- Standing problem: PRSs built on European-ancestry cohorts lose calibration elsewhere.

**5. Limits**

*Key point:* interpretation depends on curated knowledge bases, ancestry transferability, and communicating uncertain results.
- Curated knowledge bases are of variable completeness.
- Ancestry transferability; the communication problem of returning uncertain results to patients.
- AI's role is to make molecular data *actionable* — and to say honestly when it is not.

*Takeaway — genomics AI succeeds when it converts molecular data into actionable, equitably validated clinical recommendations, and admits openly where it cannot.*

**Q5. Explain AI-driven drug discovery and drug repurposing techniques.**

*Key point — AI compresses the discovery pipeline at four entry points, repurposing exploits known safety via signature reversal and knowledge graphs, and all candidates still require wet-lab and clinical validation.*

**1. Classical pipeline and AI's leverage**

*Key point:* the 10–15 year, $1–2B, failure-dominated pipeline gains speed at four AI entry points.
- Classical: target → hit → lead → preclinical → clinical I–III → approval.
- **(1) Target identification:** omics/network/literature mining nominates disease-relevant targets.
- **(2) Virtual screening:** ML predicts binding from structure, prioritizing which of billions of compounds to test physically.
- **(4) Trial design:** patient matching and site selection (Chapter 36).

**2. Generative design and property prediction**

*Key point:* models propose novel molecules optimized for desired properties.
- **(3) Generative design:** models propose novel candidates.
- **QSAR** property prediction: potency, solubility, toxicity.
- AlphaFold structures support structure-based design.

**3. Repurposing techniques**

*Key point:* approved drugs' known safety makes repurposing the fastest route to patients.
- **Signature reversal:** a drug whose gene-expression signature reverses the disease's signature is a candidate.
- **Knowledge-graph reasoning** over drugs/targets/diseases/adverse-events.
- **Literature mining** at scale.

**4. Real example — baricitinib**

*Key point:* an AI knowledge-graph/needs-analysis pipeline nominated a JAK inhibitor for COVID-19, later validated and authorized.

**5. Honest assessment**

*Key point:* AI narrows search — it does not skip validation.
- AI-computed candidates still require wet-lab and clinical validation.
- Value: fewer, better candidates entering expensive stages.
- "AI-designed" claims are pipeline claims; communicate them as such.

*Takeaway — AI's honest contribution to drug discovery and repurposing is narrowing the candidate set before expensive validation, never replacing it.*

## D.16 Unit IV — 10-Mark Questions (T3 · integrated essay/design)

**Q1. Explain AI applications in disease diagnosis for diabetes, cancer, and heart disease, including relevant medical imaging techniques.**

*Key point — each disease area has reached deployment through narrow, conservative applications, and shared imaging techniques plus design lessons explain how.*

**A. Diabetes**

*Key point:* autonomy in diabetic eye disease was earned through narrowness, standardization, and fallbacks.
- **Retinopathy screening:** CNNs grade fundus photographs for more-than-mild DR; **IDx-DR** (FDA-authorized 2018) is the first autonomous diagnostic AI — when confidence exceeds thresholds it issues the screening decision itself, otherwise it re-images or refers.
- Narrow task, standardized protocol, conservative operating point, explicit fallbacks.
- **Nephropathy and foot-risk** prediction from EHR lab/medication trajectories.
- **CGM forecasting:** LSTM-style models predict glucose minutes-to-hours ahead for insulin dosing.
- Lesson: autonomy was earned by narrowness.

**B. Cancer**

*Key point:* cancer AI spans screening, pathology grading, and prognosis/planning, evaluated on validated intermediate endpoints.
- **Screening:** mammography AI supporting radiologists (large trials: AI-supported reading matches double reading with less workload); low-dose CT lung-nodule detection for high-risk screening; dermoscopy lesion classification.
- **Detection/grading on pathology:** whole-slide imaging for lymph-node metastasis (CAMELYON16) and Gleason grading; stain/scanner variability handled by normalization and augmentation.
- **Prognosis and planning:** survival models fusing tumor features/genomics/treatment; radiotherapy auto-contouring of tumors and organs at risk (routinely deployed, radiation-oncologist verified); precision-oncology therapy matching from tumor genomics.
- Lesson: ground truth is slow — evaluation leans on biopsy-confirmed intermediate endpoints, which must themselves be validated.

**C. Heart disease**

*Key point:* cardiology AI delivers continuous screening and throughput, not just per-case accuracy.
- **ECG interpretation:** deep networks classify 12-lead ECGs across dozens of rhythms at cardiologist-level performance; screening for asymptomatic AF; phenotype-from-ECG (inferring ejection fraction from the ECG).
- **Echocardiography:** AI estimates EF and automates views/measurements.
- **CT coronary calcium scoring:** fully automated quantification for risk stratification.
- **Wearable screening:** PPG-based AF detection with ECG-patch confirmation (Apple Heart Study: PPV ≈ 0.84).

**D. Imaging techniques**

*Key point:* a shared DICOM-standardized toolbox of CNNs, U-Net segmentation, and 3-D/multi-sequence methods serves all three diseases.
- Modalities: X-ray/CT/MRI/mammography/fundus/OCT/pathology — all DICOM-standardized.
- CNNs dominate classification/detection; U-Net family dominates segmentation; 3-D convolutions for CT/MRI volumes.
- Multi-sequence MRI fusion; transfer learning for the small-data reality.
- Grad-CAM-style attention checks for shortcut learning; external validation across scanners/sites as the credibility floor.

**E. Synthesis — design lessons**

*Key point:* claim grading, earned autonomy, and post-flag design decide clinical value.
- Screening-grade vs diagnostic-grade claims — sensitivity-first triage vs precision-heavy diagnosis, each with its own operating point and regulatory pathway.
- Autonomy requires narrowness, standardization, and fallbacks.
- What happens *after* the flag (confirmatory pathway) decides clinical value.
- Per-subgroup and external validation are part of the diagnosis, not an appendix.

**Q2. Discuss predictive modelling for ICU admission and mortality risk prediction and explain the role of AI in genomics and personalized medicine.**

*Key point — ICU prediction, mortality scoring, genomics, and personalized medicine are one discipline at different scales: precise questions, leakage-free features, local calibration, and explanations.*

**A. ICU admission prediction**

*Key point:* an ED/ward triage model predicting ICU-level need, integrated into bed management.
- Framing: will this patient need ICU-level care within N hours?
- Data: triage vitals, initial labs, demographics, comorbidity indices (Charlson/Elixhauser), utilization history; features engineered over the observation window ending at prediction time (Unit II).
- Modeling: GBMs on tabular features or LSTMs on early trajectories; labels from actual ICU transfers.
- Evaluation: sensitivity at capacity-relevant specificity; calibration; integration into bed-management workflow (Chapter 3's five rights).
- Failure mode: changed admission criteria shift the label definition — monitor drift.

**B. Mortality prediction**

*Key point:* transparent classical scores are the floor; learned models must prove calibration because the output drives goals-of-care conversations.
- Classical severity scores (**APACHE II/III, SAPS II**): fixed features in the first 24 h, transparent, multi-site calibrated — the regulatory and clinical floor.
- Learned models: GBMs/LSTMs over continuous trajectories gain AUROC but must prove **calibration and local validity** — an over-confident score is a communication hazard, not just a statistical one.
- Discipline for both tasks: define time-zero (ICU admission), exclude **post-death artifact leakage**, split by patient, report per-subgroup metrics.
- Explanation artifacts (SHAP top-features) for every score presented in a family conversation.

**C. AI in genomics**

*Key point:* deep learning enters the sequencing pipeline at calling, interpretation, signatures, and structure, taming genome-scale data.
- Pipeline: FASTQ → BAM → VCF.
- **Variant calling:** deep callers rival GATK, notably on indels.
- **Pathogenicity classification:** AlphaMissense-style conservation/structure/population-frequency models.
- **Expression/omics signatures** for disease and drug response; **AlphaFold 2** protein-structure prediction enabling structure-based design.
- Data scale: ~3×10⁹ bases, millions of variants per genome — dimensionality reduction and curated knowledge bases do the heavy lifting.

**D. Personalized medicine**

*Key point:* molecular data becomes actionable through oncology matching, pharmacogenomics, and PRS stratification.
- **Precision oncology:** tumor–normal sequencing finds somatic drivers; decision support matches them to targeted therapy (EGFR → inhibitors; BRAF V600E → BRAF inhibitors; MSI-high → immunotherapy); AI adds variant prioritization, genotype-from-H&E morphology prediction, and trial matching.
- **Pharmacogenomics:** CYP2D6/CYP2C19 genotypes guide clopidogrel/codeine/tamoxifen selection and dosing; HLA-B*57:01 screening prevents abacavir hypersensitivity.
- **PRS stratification** for common-disease screening — with ancestry-transferability equity limits.

**E. Synthesis — connecting thread**

*Key point:* both domains demand the same rigor because their outputs change conversations, beds, and drugs.
- Define the question precisely; engineer leakage-free features from heterogeneous streams.
- Model with the simplest adequate architecture; prove calibration locally.
- Attach explanation artifacts — the output changes a conversation, a bed, or a drug, not just a number.

**Q3. Explain AI-driven drug discovery and drug repurposing, and discuss chatbots, virtual health assistants, IoT, and wearable devices for healthcare.**

*Key point — AI generates candidates, molecular or digital, and only validated pathways (trials, confirmatory testing, escalation rules) convert them into clinical value.*

**A. Drug discovery**

*Key point:* AI compresses the 10–15 year, >$1–2B pipeline by narrowing candidates before validation.
- Classical pipeline: target identification → hit discovery → lead optimization → preclinical → clinical I–III → approval (10–15 y, >$1–2B).
- **Target identification:** omics/network/literature mining.
- **Virtual screening:** ML-predicted binding prioritizing billions of candidates.
- **Generative design:** novel molecule proposal; QSAR property prediction for potency/solubility/toxicity; AlphaFold structures enabling structure-based design.
- **Trial optimization** (Chapter 36).
- Assessment: AI narrows search before expensive validation; it does not replace wet-lab/clinical proof.

**B. Repurposing**

*Key point:* approved drugs' known safety makes repurposing the fastest route, with AI nominating and trials deciding.
- Approved drugs have known safety — the fastest route to patients.
- Techniques: **signature reversal** (drug expression signature vs disease signature); **knowledge-graph reasoning** over drugs/targets/diseases; **literature mining**.
- Example: **baricitinib**, nominated for COVID-19 by an AI pipeline, later authorized.
- Honest framing: AI nominates; trials decide.

**C. Chatbots and virtual health assistants**

*Key point:* conversational agents support triage and adherence under strict scope, escalation, and safety constraints.
- Use cases: symptom triage/routing (conservative red-flag escalation), medication reminders/adherence, chronic-disease coaching, post-discharge check-ins, administrative support, clinician-facing documentation help.
- Safety constraints: triage/support scope (never diagnostician); rule-based escalation layer.
- PHI-safe logging (Unit III); audited behavior.
- For LLM agents: grounding, citation, and out-of-scope refusal (Unit V).

**D. IoT medical devices**

*Key point:* a sensor-to-dashboard pipeline with edge, resilience, and security constraints carries safety-critical data.
- Architecture: sensors (CGM, SpO₂, BP, weight) → gateway/phone → cloud platform → ML services → clinician dashboards/alerts.
- ML services: artifact rejection, event detection, hypoglycemia forecasting, adherence inference, predictive maintenance.
- Engineering constraints: edge/battery budgets (small models, Ch. 18 discipline); connectivity outages (graceful degradation); interoperability.
- **Cybersecurity:** a connected insulin pump is safety-critical networked infrastructure.

**E. Wearables**

*Key point:* continuous consumer monitoring succeeds via conservative flags and a defined confirmatory pathway.
- Continuous consumer monitoring: PPG heart rate, activity/sleep, CGM integration.
- **AF screening template:** flag → confirmatory ECG patch → PPV ≈ 0.84 in the Apple Heart Study.
- Design lessons: conservative flags; a defined confirmatory pathway ("screening claims live or die after the flag").
- Honest communication of what a negative means; calibration equity across skin tones (PPG optics) and age.

**F. Synthesis**

*Key point:* discovery and digital health are two ends of the same translation problem, governed by identical engineering discipline.
- AI generates candidates — molecules or alerts; *validated pathways* (trials; confirmatory testing; escalation rules) convert them into clinical value.
- The engineer's discipline is identical in both: narrow claims, conservative fallbacks, measured what-happens-next.

## D.17 Unit V — 2-Mark Questions (T1 · recall)

**Q1. What is bioethics in the context of healthcare AI?**

*Key point — bioethics is the moral framework deciding whether and how algorithms may touch patient care.*
- **Definition:** the systematic study of moral questions in medicine and life sciences, applied to AI-influenced decisions.
- **Anchor:** four principles — autonomy, beneficence, non-maleficence, justice.
- **Example:** choosing a sepsis model's alert threshold is a bioethical decision, not merely a statistical one.

**Q2. Define Software as a Medical Device (SaMD).**

*Key point — SaMD is software with a medical purpose that is not part of a hardware device.*
- **Definition (IMDRF, adopted by FDA/EU):** software intended for diagnosis, treatment, triage, or monitoring, performing that purpose *without being part of a hardware medical device*.
- **Example:** a CNN screening retinal photographs for diabetic retinopathy is SaMD; a hospital image-archiving tool is not.

**Q3. What is federated learning?**

*Key point — train a shared model across sites without moving the underlying patient data.*
- **Definition:** decentralized training; each site trains locally and returns only model updates.
- **Aggregation:** a coordinating server combines updates (typically FedAvg — weighted averaging).
- **Healthcare benefit:** multi-institution learning under HIPAA/GDPR data-residency constraints.

**Q4. What is fairness in machine learning?**

*Key point — fairness means no unjustified differential treatment or performance across individuals or groups.*
- **Formal definitions:** demographic parity (equal positive-prediction rates); equalized odds (equal TP and FP rates); calibration within groups (equal PPV).
- **Healthcare practice:** per-subgroup sensitivity/specificity/calibration audits — uneven error rates become unequal care.

**Q5. What is a model card?**

*Key point — standardized documentation that makes a model's authorization and behavior inspectable.*
- **Contents:** intended use, training-data provenance, evaluation (with per-subgroup breakdowns), operating point, known limitations, update history.
- **Role:** the fairness-audit and governance artifact for clinicians, reviewers, and regulators (Chapter 33).

## D.18 Unit V — 3-Mark Questions (T2 · application)

**Q1. Explain the four bioethical principles and their application to AI in healthcare.**

*Key point — four principles, four AI applications, four characteristic failure modes.*

**1. Autonomy**

- *Key point:* patients' right to informed, uncoerced, contestable decisions.
- Consent must cover secondary data use; AI involvement disclosed; recommendations contestable.
- Failure mode: black-box recommendations patients cannot question.

**2. Beneficence**

- *Key point:* deploy only where benefit is demonstrated by local validation.
- Published AUROC is not benefit; earlier detection and reduced workload are.
- Failure mode: efficiency-first deployment that quietly degrades care.

**3. Non-maleficence**

- *Key point:* audit the harms AI uniquely creates before and after go-live.
- Alert fatigue, automation bias, silent degradation under drift.
- Failure mode: a ward flooded with alerts until clinicians stop listening.

**4. Justice**

- *Key point:* distribute benefit and burden fairly across populations.
- Equal performance across demographic groups; access beyond wealthy systems.
- Failure mode: one-population models silently serving all populations.

**Q2. List the major sources of bias in healthcare AI systems.**

*Key point — bias enters at every lifecycle stage, so mitigation must span collection, labeling, modeling, and monitoring.*

| Source | Mechanism / example |
| --- | --- |
| Historical | data records past inequities — spending as proxy for need |
| Representation | thin subgroups — darker skin in dermatology images |
| Measurement | instruments differ across groups — pulse oximetry vs skin tone |
| Label | ground truth shaped by coding practice and access to care |
| Aggregation | one model for all subgroups hides subgroup patterns |
| Deployment | used differently than designed across resource levels |

**Q3. Compare FDA and CE-marking routes for AI-based medical software.**

*Key point — both regimes authorize a claim (population, operating point, oversight), and drifting from it is a regulatory event.*

| Dimension | FDA (US) | CE (EU) |
| --- | --- | --- |
| Pathways | 510(k) predicate equivalence; De Novo (first-of-kind, e.g. IDx-DR); PMA (class III) | MDR classes I–III via notified body |
| Adaptation | PCCP pre-authorizes planned updates | change needs re-assessment |
| Standing duties | post-market surveillance; public device list | clinical evaluation; vigilance; AI Act high-risk duties; GDPR |

**Q4. State the benefits and challenges of federated learning in healthcare.**

*Key point — federation buys multi-institution learning under privacy law but pays in heterogeneity and leakage risk.*

**1. Benefits**

- *Key point:* learning without data movement.
- Population diversity improves generalizability; rare-disease pooling; no central breach honeypot.

**2. Challenges**

- *Key point:* non-IID sites are the defining problem.
- Sites differ in population, coding, devices — naive averaging degrades performance.
- Updates can still leak (gradient inversion, membership inference) — needs secure aggregation + DP; report per-site results, not pooled averages.

**Q5. Why is explainability important for clinical adoption of AI?**

*Key point — explanations let clinicians verify, calibrate trust, and stay accountable; attribution ≠ causation.*

- **Verification:** clinicians check recommendations against clinical reasoning before acting.
- **Calibrated trust:** trust proportional to demonstrated reliability — guards against automation bias and disuse.
- **Accountability and law:** recordable, reviewable decisions; EU AI Act transparency and human-oversight duties.
- **Debugging:** SHAP/Grad-CAM expose shortcut learning before patients see it.
- **Caveat:** attribution shows what pushed the score, not what caused the disease.

## D.19 Unit V — 5-Mark Questions (T3 · structured explanation)

**Q1. Explain the bioethical principles governing AI in healthcare with suitable examples.**

*Key point — the four principles are the standing framework; their failure modes are decided at deployment-time choices like thresholds and oversight.*

**1. Autonomy**

- *Key point:* decision-making right, extended to data and algorithms.
- Consent covering secondary use; disclosure of AI involvement; contestable recommendations (Chapter 34's explanation artifact).
- Failure: black-box recommendations patients cannot question.

**2. Beneficence**

- *Key point:* benefit must be demonstrated locally, not published remotely.
- Local validation before deployment; deploy only for a defined benefit — earlier sepsis detection, reduced reading workload.
- Failure: efficiency-first deployments that quietly degrade care quality.

**3. Non-maleficence**

- *Key point:* audit the AI-specific harms.
- Alert fatigue (a safety hazard itself), automation bias passing model errors through, silent drift-driven degradation.
- Example: a maximum-sensitivity sepsis model floods a ward until clinicians stop listening.

**4. Justice**

- *Key point:* who bears each error type is a distributive question.
- Per-subgroup performance audits (Chapter 31); models that work beyond wealthy institutions; thresholds chosen with awareness of error burden.
- Example: the Obermeyer cost model under-referring patients who historically received less care.

**Takeaway — the principles collide in real settings: a sepsis threshold is simultaneously a non-maleficence and a justice decision, so threshold, oversight, and monitoring plans are ethical documents, not just engineering ones.**

**Q2. Describe bias in healthcare AI, its sources, and mitigation strategies.**

*Key point — bias is usually a faithful copy of biased data, labels, and delivery systems; the strongest fixes are upstream.*

**1. Data-stage sources**

- *Key point:* the data records a biased world.
- Historical: cost-as-need proxy (Obermeyer — under-estimated Black patients' illness burden); representation: darker skin in dermatology corpora, women in cardiac cohorts; measurement: pulse oximetry overreading SpO₂ in darker skin.

**2. Label- and model-stage sources**

- *Key point:* ground truth inherits coding practice and access.
- Label bias: ICD codes reflect documentation; diagnosis requires prior access to care. Aggregation bias: one model hides subgroup patterns. Deployment bias: use differs from design across sites.

**3. Mitigation by stage**

- *Key point:* match the fix to the stage.

| Stage | Techniques |
| --- | --- |
| Pre-processing | re-specify target (need, not cost); targeted collection; re-weighting |
| In-processing | fairness-constrained training; adversarial debiasing |
| Post-processing | group-specific thresholds (with legal/ethical review) |
| Process | disaggregated evaluation before and after deployment |

**4. The fairness audit as deliverable**

- *Key point:* the audit ships as the model card.
- Subgroup counts; per-subgroup sensitivity/specificity/PPV/calibration; the chosen fairness definition and why; limitations; monitoring plan.
- Remember: calibration-within-groups and equalized odds cannot both hold when base rates differ — the choice is a documented value judgment.

**Takeaway — removing a protected attribute from the inputs is not mitigation: proxies (cost, zip code, utilization) re-encode what was removed.**

**Q3. Explain the regulatory approval pathways for AI-based medical devices (FDA and CE).**

*Key point — both regimes authorize the intended use, not the model; drift from it is a regulatory event.*

**1. SaMD classification**

- *Key point:* risk = situation criticality × output significance.
- IMDRF definition; a radiologist-facing triage tool and an autonomous diagnostic are different risk categories with different evidentiary burdens.

**2. FDA pathways**

- *Key point:* predicate-driven, risk-tiered.

| Pathway | Logic | Typical use |
| --- | --- | --- |
| 510(k) | substantial equivalence to predicate | most imaging CAD/CDS |
| De Novo | first-of-kind, low–moderate risk | IDx-DR |
| PMA | class III, clinical data required | high-risk diagnostics |

**3. Predetermined Change Control Plans**

- *Key point:* pre-authorized adaptation replaces the locked-model rule.
- 2023+ guidance: pre-specify retraining protocol, acceptance criteria, update validation; FDA's public AI/ML device list exceeds a thousand authorizations.

**4. EU: MDR + AI Act + GDPR**

- *Key point:* class-based conformity with heavier standing duties.
- MDR 2017/745: classes I–III, notified-body assessment, clinical evaluation, post-market surveillance. AI Act adds high-risk duties (risk management, data governance, transparency, human oversight). GDPR governs the data.

**Takeaway — post-authorization drift (new population, changed threshold, autonomous use of an assistive tool) is itself a regulatory event requiring new submission or notification.**

**Q4. Explain federated learning architectures, their challenges, and privacy-preserving techniques.**

*Key point — bring the model to the data; secure aggregation and DP complete the honest threat model.*

**1. The FedAvg loop**

- *Key point:* only parameters travel, never records.
- Server distributes global model → sites train locally → return updates → server aggregates (weighted by site data size) → repeat; then per-site validation and Chapter 33 governance.

**2. Settings**

- *Key point:* cross-silo is the healthcare standard.
- Cross-silo: few reliable hospitals/consortia. Cross-device: thousands of unreliable endpoints with tiny per-device data.

**3. Challenges**

- *Key point:* non-IID is the defining challenge.
- Populations, coding, devices differ — remedies: personalized layers, feature alignment, robust aggregation; straggler tolerance; orchestration cost; report per-site results on local held-out data.

**4. Threat model and defenses**

- *Key point:* updates themselves can leak.

| Attack | Defense |
| --- | --- |
| Gradient inversion | secure aggregation — server sees sums only |
| Membership inference | differential privacy — noise bounds one patient's influence (ε) |
| Pipeline leakage | pseudonymized keys, audit logs, governance |

**Takeaway — the honest claim is "data minimization plus DP-bounded leakage", not "fully private".**

**Q5. Discuss explainable AI (XAI) techniques and their role in building clinical trust.**

*Key point — XAI supports calibrated trust through verification, anti-automation-bias design, and accountability — within its limits.*

**1. Techniques**

- *Key point:* pick the tool to the question asked.

| Technique | Question answered | Limits |
| --- | --- | --- |
| LIME | local surrogate by perturbation | unstable across seeds |
| SHAP/TreeSHAP | Shapley attributions; additive, consistent | attribution ≠ causation |
| Grad-CAM/saliency | where did the model look | shortcut check, not proof |

**2. Role in clinical trust**

- *Key point:* trust must be calibrated, not felt.
- Verification against clinical reasoning; anti-automation-bias design (uncertainty display, mandatory confirmation); accountability for records and the EU AI Act's transparency duties.

**3. The explanation artifact**

- *Key point:* a designed package, not a decoration.
- Calibrated score + uncertainty; top attributions in clinical language; similar past cases; one counterfactual; stated limitations.

**4. Limits and governance answer**

- *Key point:* fluent ≠ faithful.
- LIME instability, gamed attributions, rationalizations feeding automation bias; governance answers with faithfulness checks and periodic review of displayed rationales (Chapter 33).

**Takeaway — an explanation is part of the clinical decision only when its faithfulness is checked like any other model property.**

## D.20 Unit V — 10-Mark Questions (T3 · integrated essay/design)

**Q1. Discuss bioethical principles, bias and fairness, and regulatory requirements for deploying AI in healthcare.**

*Key point — principles define what must hold, the bias program defines what to measure, regulation defines what must be proven; missing any one voids all three.*

**A. Bioethical principles**

*Key point:* autonomy, beneficence, non-maleficence, justice — applied to AI decisions.
- Autonomy: consent for secondary use; disclosed AI involvement; contestable recommendations.
- Beneficence: deploy on locally validated benefit, not published AUROC alone.
- Non-maleficence: audit alert fatigue, automation bias, silent degradation, per-subgroup error costs.
- Justice: equitable performance and access; thresholds chosen knowing who bears each error.
- Collision example: a sepsis operating point trades alert burden (non-maleficence) against missed patients (justice) — so threshold decisions belong to the governance committee, documented like a clinical policy.

**B. Bias and fairness**

*Key point:* measure disaggregated performance and state the fairness definition.
- Sources: historical (cost-as-need proxy), representation (thin subgroups), measurement (pulse oximetry), label (coding practice, access), aggregation, deployment.
- Formal: demographic parity, equalized odds, calibration within groups — with the impossibility result making the choice a documented value judgment.
- Mitigation by lifecycle stage; strongest upstream: fix the target variable, collect the missing subgroup; always ship a per-subgroup fairness audit.
- Removing protected attributes is insufficient — proxies re-encode them.

**C. Regulation**

*Key point:* authorize claims; manage adaptation.
- SaMD classification: situation criticality × output significance.
- FDA: 510(k) / De Novo (IDx-DR) / PMA; PCCPs pre-authorize updates; public device list >1,000.
- EU: MDR classes I–III with notified bodies; AI Act high-risk duties; GDPR for data.
- Both authorize intended use — population, operating point, oversight design — so drift is a regulatory event.

**D. Composition — deployment ethics as one system**

*Key point:* the three layers must all be present at go-live.
- A deployed model ships with: locally validated evidence matched to its claim; per-subgroup fairness audit with limitations; authorization with defined intended use and oversight design; monitoring and incident-reporting plan.
- Missing any one = operating outside ethical, scientific, and legal warrant simultaneously.

**Synthesis**

- Principles: *what must hold*; bias program: *what to measure*; regulation: *what to prove and document*.
- The sharpest lesson of the unit: ethics, evidence, and law fail together, not separately.

**Q2. Design a responsible deployment and governance plan for a hospital-wide AI early-warning system, covering local validation, monitoring, oversight, and accountability.**

*Key point — trust is operational: earned by validation, preserved by monitoring, governed by named people.*

**A. Pre-deployment evidence**

*Key point:* prove it works *here*, for *this claim*.
- Regulatory position: classify (SaMD triage vs diagnostic); confirm authorization matches intended use (Chapter 32).
- Local validation on this hospital's data: AUROC/AUPRC, calibration at candidate thresholds, per-subgroup metrics (Chapter 31 audit).
- Threshold selection by clinical cost with the governance committee, documenting the ethical trade-off.
- Model card: provenance, evaluation, operating point, limitations, update history.

**B. Staged rollout**

*Key point:* silent first, narrow second, expand only on criteria.
- Shadow mode: run silently; compare to actual outcomes; test workflow fit.
- Pilot one unit with predefined success criteria (alert acceptance, timeliness, no outcome degradation).
- Incremental expansion with a rollback plan at every stage; train clinicians on what the score means and the escalation pathway.

**C. Monitoring**

*Key point:* drift is not uniform — watch inputs, outcomes, and equity.
- Data drift: distribution tests on features (new analyzers, EHR upgrades, referral shifts).
- Concept drift: outcome-linked performance on prospectively reviewed alert samples.
- Equity dashboards: per-subgroup performance reviewed monthly.
- Incident reporting: a defined harm channel feeding pharmacovigilance-style review and regulatory vigilance.

**D. Oversight and interface design**

*Key point:* apply the five rights; keep human checking alive.
- Right information (score + attributions + similar cases + limitations), person, format, channel, time (Chapter 3).
- Anti-automation-bias safeguards: uncertainty display, mandatory confirmation for high-stakes actions, periodic challenge audits of agreement rates.

**E. Governance and accountability**

*Key point:* close the accountability gap with process, defined before go-live.
- Standing AI committee (clinical, data science, informatics, ethics, legal) owns go/no-go, thresholds, retirement.
- Reproducibility: every decision traceable to model version, data snapshot, code commit.
- Vendor contracts define update/defect/monitoring duties; clinical accountability stays with the treating team.

**F. Retirement**

*Key point:* retire with the same formality as deployment.
- Trigger on unrecoverable drift, care-process change, or a better-validated replacement.

**Synthesis**

- The plan's principle: earned by validation, preserved by monitoring, governed by people whose names are on the decision.
- Governance is continuous — every stage has an owner and a document.

**Q3. Explain federated learning and privacy-preserving machine learning in healthcare, and discuss future directions of AI in medicine.**

*Key point — federation solves data movement, trials solve evidence, governance solves trust; the future is the maturing of that triad.*

**A. Why federation**

*Key point:* healthcare data cannot move; models can.
- HIPAA/GDPR constraints, institutional ownership, breach risk vs the need for multi-institution diversity and rare-disease pooling.

**B. The FedAvg loop**

*Key point:* only parameters travel.
- Server distributes global model → sites train locally → return updates → weighted aggregation → iterate to convergence; per-site validation before deployment under Chapter 33 governance.

**C. Settings and challenges**

*Key point:* non-IID defines healthcare federation.
- Cross-silo (few reliable hospitals — the standard) vs cross-device (many unreliable endpoints).
- Non-IID remedies: personalized layers, feature alignment, robust aggregation; straggler tolerance; evaluation honesty — per-site results, not pooled averages.

**D. The privacy-preserving stack**

*Key point:* federation alone is not privacy.
- Attacks: gradient inversion reconstructs inputs; membership inference tests training membership.
- Defenses: secure aggregation (server sees sums only); differential privacy (noise bounds any patient's influence, budget ε); pipeline controls — pseudonymization, audit logs, governance.
- Honest claim: data minimization with bounded, audited leakage.

**E. Future directions**

*Key point:* each direction raises a governance demand.

| Direction | Governance demand |
| --- | --- |
| Foundation models (multimodal) | validation, bias, regulation at scale |
| Ambient documentation agents | accuracy, PHI handling, note-truth drift |
| Agentic decision support | autonomy/oversight at new intensity |
| Continuous personalized models | individual baselines need monitoring |
| Federated scale-up | cross-institution governance as default |
| Regulatory maturation | PCCP-style oversight for continuously learning systems |
| Evidence maturation | RCTs with endpoint–claim match (colonoscopy CADe; MASAI) |

**F. Synthesis**

- Federation and privacy-preserving ML solve the *data movement* problem; trials solve the *evidence* problem; governance solves the *trust* problem.
- The future is not one breakthrough — it is more institutions learning together without moving data, stronger prospective evidence for what helps, and governance that keeps every deployed model worthy of the trust placed in it.
