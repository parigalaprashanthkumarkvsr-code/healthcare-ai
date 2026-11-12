# UNIT III — Machine Learning & Deep Learning for Healthcare Analytics

This unit is the modeling core of the course: the learning paradigms, the neural architectures that dominate medical data, the metrics that make clinical claims honest, the imbalance problem that rare diseases create, the explainability frameworks that make models usable by clinicians, and the privacy law that makes deployment legal.

# Chapter 15. Supervised Learning for Risk Prediction and Diagnostic Classification

Supervised learning is healthcare ML's workhorse: learn from labeled patients to predict risk or classify disease, under the strict discipline that clinical data imposes.

## 15.1 Chapter objectives

1. Frame the two canonical supervised tasks: diagnostic classification and risk prediction.
2. Build the supervised pipeline with clinical discipline (time-zero, splits, calibration).
3. Recognize healthcare-specific failure modes: leakage, shift, and miscalibration.

## 15.2 The two canonical tasks

- **Diagnostic classification:** `y` = presence of a condition at (or near) prediction time. Binary (disease present/absent) or multiclass (rhythm classification across dozens of arrhythmias). Cross-sectional data: the study at hand plus available history.
- **Risk prediction:** `y` = a future event (readmission within 30 days, deterioration within 12 h, mortality during admission). Longitudinal data; time-zero must be defined (admission? first abnormal vital?); labels arrive with delay.

## 15.3 The pipeline, clinically disciplined

```
cohort definition (inclusion/exclusion, time-zero)
  → label definition (from ICD/clinical criteria; audit the gold standard)
  → features (Unit II) over an observation window ending before prediction time
  → split BY PATIENT (no leakage across train/validation/test)
  → model (logistic regression / GBM / NN; class weights for imbalance)
  → evaluation (AUROC, AUPRC, calibration; per-subgroup)
  → calibration (Platt/isotonic) → threshold by clinical cost
```

Default model ladder: **logistic regression** (interpretable baseline, still publishable and deployable), **gradient-boosted trees** (strongest on tabular EHR data), **neural networks** (when raw signals/images demand learned features). Regularization (L1/L2) and early stopping are the standing defenses against the modest-n, high-dimension reality of clinical datasets.

## 15.4 Clinical failure modes

1. **Leakage** — a lab drawn *because* the patient deteriorated; a post-decision diagnosis code; a scaler fitted on all data (Chapter 11).
2. **Dataset shift** — the model meets a different hospital, different coding practice, different population.
3. **Miscalibration** — an AUROC of 0.85 says nothing about whether "0.8" *means* 80%; calibration curves and Brier scores are mandatory when scores drive decisions.
4. **Label noise** — the "gold standard" (ICD codes, clinician review) is itself imperfect.

## 15.5 Key terms

- **Risk prediction** — supervised prediction of a future clinical event.
- **Diagnostic classification** — supervised classification of present condition.
- **Time-zero** — the defined moment from which features are measured.
- **Calibration** — agreement between predicted probabilities and observed frequencies.
- **Model ladder** — logistic regression → GBM → deep nets, in order of data hunger.

## 15.6 Review questions

1. Contrast diagnostic classification and risk prediction on data type and label timing.
2. Why must splits be by patient rather than by encounter?
3. A model has AUROC 0.85 but miscalibrated probabilities. What breaks in deployment?

---

# Chapter 16. Unsupervised Learning: Stratification, Phenotyping, Anomaly Detection

When no label exists — or when you want to *discover* the structure of disease — unsupervised learning finds the groups and the outliers hiding in the data.

## 16.1 Chapter objectives

1. Apply clustering to patient stratification and phenotyping.
2. Use anomaly detection for clinical outliers and data-quality surveillance.
3. Connect discovered clusters to clinical interpretation and validation.

## 16.2 Patient stratification and phenotyping

**Phenotyping** = grouping patients by shared characteristics into clinically meaningful subtypes. Methods: k-means and hierarchical clustering on engineered feature vectors (labs, comorbidities, utilization); Gaussian mixture models for soft assignment; dimensionality reduction (PCA/UMAP) to visualize the structure. Landmark example: clustering of newly diagnosed diabetes patients into five subtypes with different progression and complication risks (Ahlgren et al., Lancet Digital Health 2018) — a discovered taxonomy, validated against future complications.

The discipline: clusters are *hypotheses*, not discoveries. Validation means checking whether clusters differ on outcomes *not used* to form them, and whether clinicians find them actionable.

## 16.3 Anomaly detection

Score how far an observation sits from the learned "normal" manifold: **isolation forests** on tabular EHR windows; **one-class SVMs** on small clean cohorts; **autoencoders** whose reconstruction error flags the unusual (Chapter 17's architectures apply). Uses: ICU data-quality surveillance (impossible values, sensor drift), novel-pathogen or unusual-lab-pattern flagging, and fraud in claims. The standing limitation: novelty is not pathology — new protocols, new devices, and new patient populations are all "anomalies"; clinical triage of flagged anomalies is mandatory, and the false-positive economy is dominated by exactly the benign-novelty cases.

## 16.4 Key terms

- **Phenotyping** — defining/deriving patient subtypes from data.
- **Stratification** — partitioning a population into risk or subtype groups.
- **Isolation forest** — tree-based anomaly detector scoring ease of isolation.
- **Autoencoder anomaly score** — reconstruction error against a benign-trained manifold.
- **Cluster validation** — checking clusters against unused outcomes and clinical actionability.

## 16.5 Review questions

1. Describe the diabetes-subtype study as a phenotyping pipeline: features, method, validation.
2. Why is "anomaly = disease" the unsupervised rookie error?
3. How would you validate a discovered cluster clinically?

---

# Chapter 17. CNNs and Transfer Learning for Medical Imaging

Convolutional networks read pixels; transfer learning lets them read medicine's small datasets — together they are the reason image AI reached clinical quality.

## 17.1 Chapter objectives

1. Explain the CNN inductive bias and its fit to medical images.
2. Apply transfer learning: what to reuse, when to fine-tune, how much data is needed.
3. Evaluate an imaging model honestly (per-class metrics, external validation).

## 17.2 Why CNNs fit medical images

A CNN convolves small learned filters across the image, so it encodes two assumptions that are true of radiographs: **local patterns matter** (edges, textures, lesions) and **position matters less than pattern** (a nodule can be anywhere). Architectures stack convolutions + pooling into hierarchy: edges → textures → organs → findings. For detection tasks, the same backbone feeds object detectors; for segmentation, encoder–decoder designs (U-Net — Chapter 25).

## 17.3 Transfer learning: the small-data solution

Medical datasets are thousands, not millions; ImageNet pretraining transfers surprisingly well because low-level filters (edges, textures) are universal. The recipe:

1. **Pretrained backbone** (ResNet, EfficientNet, ViT) — frozen or slowly unfrozen.
2. **New head** for the clinical task (e.g., 14 CheXpert findings).
3. **Fine-tune** with a small learning rate; unfreeze progressively if data allows.
4. **Augmentation matched to clinical invariances** — rotation/flip within anatomical plausibility, contrast/stain jitter; *never* augmentations that change pathology.
5. **Domain gap check:** if ImageNet→medical transfer underperforms, use self-supervised pretraining on medical images (RadImageNet-style) instead.

```python
import torch, torchvision
model = torchvision.models.resnet50(weights='IMAGENET1K_V2')
model.fc = torch.nn.Linear(model.fc.in_features, 14)   # CheXpert-style 14 findings
# train: small LR (1e-4), unfreeze layer4 after epochs warm-up, AUPRC per finding
```

Landmarks: dermatologist-level skin-lesion classification (Esteva 2017), CheXNet-style pneumonia detection, IDx-DR autonomous retinopathy screening (FDA-authorized 2018).

## 17.4 Honest evaluation

Per-finding **AUPRC** (imbalanced findings), not accuracy; external validation on a *different hospital/scanner population* (the single most common gap between papers and products); per-subgroup performance; and clinically meaningful operating points chosen by radiologist review of misses. Interpretability via Grad-CAM/saliency: does the model look at the lesion — or at the pacemaker and the leftmost annotation?

## 17.5 Key terms

- **Convolution/pooling** — learned local filters / downsampling that builds the feature hierarchy.
- **Transfer learning** — reusing pretrained representations for a new task.
- **Fine-tuning** — updating pretrained weights (partially/fully) on the clinical task.
- **Grad-CAM** — class-activation map showing where the model looked.
- **External validation** — evaluation on data from a different population/institution.

## 17.6 Review questions

1. Why do CNN inductive biases match radiographs, and where do they fail (e.g., counts, laterality with flipped augmentation)?
2. Write the transfer-learning recipe and state when ImageNet pretraining is the wrong source.
3. Why is external validation the most common credibility gap in imaging AI papers?

---

# Chapter 18. RNNs/LSTMs for Clinical Time Series

Vitals, labs, and events arrive as sequences; recurrent networks carry history forward, and the LSTM's gates decide what to remember — the architecture behind hours-ahead deterioration prediction.

## 18.1 Chapter objectives

1. Explain the recurrence and gating mechanics of LSTM/GRU.
2. Build sequence models for vitals/labs: classification and next-step prediction.
3. Choose between recurrent and transformer models on clinical grounds.

## 18.2 The recurrence and the gates

A recurrent network processes a sequence one step at a time, carrying a hidden state — but plain RNNs forget (vanishing gradients). The **LSTM** adds a cell state with gates — forget, input, output — that learn what to keep:

```
f_t = σ(W_f[h_{t-1}, x_t])       # forget: which old context to drop
i_t = σ(W_i[h_{t-1}, x_t])       # input: what to write
c_t = f_t ⊙ c_{t-1} + i_t ⊙ tanh(W_c[...])
h_t = o_t ⊙ tanh(c_t)            # output: what to expose now
```

Clinical intuition: a patient whose creatinine has been climbing for 36 hours should be judged with that whole trajectory in mind; the cell state carries it. The **GRU** is the two-gate simplification — the default when compute is scarce.

## 18.3 Clinical sequence tasks

1. **Sequence classification:** feed the first-N-hours window (vitals, labs, meds, events) → predict deterioration/sepsis within the next horizon; the model consumes irregular sampling via time-aware encodings (time since last measurement as input).
2. **Next-step prediction / anomaly:** train on benign trajectories to predict the next value/event; surprise = −log P(observed next step). Unsupervised, useful where labels are scarce.
3. **Waveform sequences:** ECG/EEG segments as sequences of derived features or raw samples.

## 18.4 Practical notes and the transformer comparison

Practicalities dominate: pad/pack sequences for batching; mask and encode irregular sampling; handle missing channels (a vitals stream where SpO₂ appears only when measured); use unidirectional models for online scoring; validate out-of-time (patients from later months in test). **Transformers** replace recurrence with attention over all positions — better long-range patterns and parallel training; small LSTMs/GRUs still win on edge/latency budgets and modest data. Clinical pattern: start with an LSTM/GRU baseline; adopt transformers when data and infrastructure justify them.

## 18.5 Key terms

- **Cell state / gates** — the LSTM's memory line and its forget/input/output controllers.
- **GRU** — two-gate LSTM simplification.
- **Time-aware encoding** — representing irregular sampling gaps as model inputs.
- **Next-step surprise** — −log P(next event) anomaly scoring on benign-trained sequences.
- **Sequence classification vs next-step prediction** — the two deployment patterns.

## 18.6 Review questions

1. Explain what each LSTM gate learns, with a clinical interpretation.
2. Design the input representation for an irregularly sampled vitals+labs sepsis model.
3. Why must the deployment model be unidirectional while a research model could be bidirectional?

---

# Chapter 19. Evaluation Metrics: Sensitivity, Specificity, AUC-ROC, Precision, F1

In medicine, the metrics *are* the claim. This chapter defines them precisely and shows which one answers which clinical question.

## 19.1 Chapter objectives

1. Define the confusion matrix and derive all core metrics from it.
2. Choose metrics by clinical question and prevalence.
3. Read an ROC and PR curve correctly, including the base-rate trap.

## 19.2 The confusion matrix and its metrics

| | Predicted positive | Predicted negative |
|---|---|---|
| **Actually positive** | TP | FN |
| **Actually negative** | FP | TN |

- **Sensitivity (recall, TPR)** = TP/(TP+FN) — of the truly diseased, how many did we catch? The metric when *missing disease* is the dominant cost (screening).
- **Specificity (TNR)** = TN/(TN+FP) — of the truly healthy, how many were correctly cleared?
- **Precision (PPV)** = TP/(TP+FP) — of those we flagged, how many were real? The metric when *follow-up burden* matters (low-prevalence screening).
- **NPV** = TN/(TN+FN) — how reliable is a negative result?
- **F1** = harmonic mean of precision and recall — a single balanced number (arbitrary weighting; report with the pair).
- **Accuracy** = (TP+TN)/N — misleading under imbalance (rare disease ⇒ "all negative" scores high).

## 19.3 Thresholds, ROC, and PR curves

Metrics above depend on a threshold; curves characterize the *whole range*. **ROC** plots TPR vs FPR (1−specificity) across thresholds; **AUC-ROC** = probability a random positive ranks above a random negative. **PR curves** plot precision vs recall; **AUPRC** is far more informative at low prevalence — the base-rate trap: with 0.1% positives, an ROC-AUC of 0.999 can still mean unacceptable precision. Diagnostic relevance: **likelihood ratios** (sensitivity/1−specificity) update pre-test to post-test probability — the formal bridge between a model score and clinical reasoning.

## 19.4 Choosing metrics by clinical question

| Clinical question | Metric |
|---|---|
| Screening: don't miss disease | Sensitivity (at an acceptable specificity floor) |
| Avoid unnecessary invasive follow-up | Precision/PPV |
| Rule out safely | Specificity / NPV |
| Rank patients for review | AUC-ROC, AUPRC |
| Automated action on the score | Calibration (Brier), per-subgroup |

Also report the confusion matrix *at the clinically chosen operating point*, calibration plots, and per-subgroup breakdowns (Unit V). Never report a single number as if it were the whole claim.

## 19.5 Key terms

- **Sensitivity / Specificity** — TPR / TNR.
- **PPV / NPV** — predictive values; prevalence-dependent.
- **AUC-ROC / AUPRC** — area under ROC / precision-recall curves.
- **Base-rate trap** — ROC-AUC flattering a model at low prevalence.
- **Operating point** — the threshold chosen for deployment by clinical cost.

## 19.6 Review questions

1. Derive sensitivity, specificity, PPV, NPV from a 2×2 table with worked numbers.
2. Why is AUPRC the better default for rare-disease screening?
3. Two models have equal AUROC; one has far better calibration. Which deploys, and why?

---

# Chapter 20. Imbalanced Healthcare Datasets: Rare Disease Detection

Rare disease detection is the class-imbalance problem in its purest form — and the fixes are cost-sensitivity, honest metrics, and better *real* positives, not just clever resampling.

## 20.1 Chapter objectives

1. Quantify the imbalance problem and its effect on training and metrics.
2. Apply resampling, cost-sensitive learning, and threshold methods.
3. Design evaluation that survives imbalance (PR curves, per-subgroup, calibration).

## 20.2 The problem, quantified

Rare diseases run 1:1,000 to 1:100,000. Consequences: accuracy is meaningless ("all negative" = 99.9%); loss functions are dominated by negatives (a model that predicts nothing is "optimal" under plain MSE/CE); validation sets hold a handful of positives; and calibration at the decision boundary is built on almost no signal.

## 20.3 The toolbox

- **Data-level:** undersample the majority; **oversample** the minority; **SMOTE** (synthetic minority interpolation — with the caveat that interpolated patients may be clinically implausible; prefer real data); targeted data collection (registries, multi-site pooling).
- **Cost-level:** class weights (`pos_weight ≈ N_neg/N_pos`), **focal loss** ((1−p_t)^γ focuses training on hard cases), and **threshold selection by clinical cost** — usually the highest-ROI fix: choose the operating point from the FP budget of the clinic, not from F1.
- **Algorithm-level:** balanced bagging/ensembles; anomaly pre-screening then supervised classification on flagged cases.
- **Reality-level (the strongest fix):** get more *true positives* — pooled registries, expert-curated caches, active learning (label the uncertain band).

## 20.4 Evaluation that survives imbalance

Report **AUPRC** and **precision at k** (the analyst's/clinician's attention budget); the confusion matrix at the clinical operating point; **per-subgroup** sensitivity/specificity (imbalance often correlates with demographics — Unit V); and calibration. Beware the ROC trap (Chapter 19). For rare diseases specifically, state the absolute numbers (e.g., "1 of 3 true positives caught at 500 false positives per 10,000 screens") — proportions hide small-denominator fragility.

## 20.5 Key terms

- **Class imbalance** — positive prevalence far below 50%.
- **SMOTE** — synthetic minority oversampling by interpolation.
- **Focal loss** — down-weights easy examples, focuses on hard ones.
- **Threshold by cost** — operating point chosen from the clinic's FP/FN cost structure.
- **Small-denominator fragility** — metrics on few positives have huge uncertainty.

## 20.6 Review questions

1. Show numerically why accuracy fails at 1:1,000 prevalence.
2. When is SMOTE harmful in clinical data?
3. Design the evaluation report for a 1:10,000 screening model (list every component).

---

# Chapter 21. Explainable AI: LIME and SHAP

Clinicians will not act on a naked score; LIME and SHAP are the two frameworks that turn model outputs into local, feature-level explanations.

## 21.1 Chapter objectives

1. Explain LIME's local-surrogate mechanism and its guarantees/limits.
2. Explain SHAP's Shapley-value attribution and its properties.
3. Design the explanation artifact a clinical alert should carry.

## 21.2 LIME — Local Interpretable Model-agnostic Explanations

**Idea:** approximate the black box *locally* with a simple interpretable model (linear/decision-tree). Procedure: (1) take the instance; (2) perturb it — generate nearby samples (flip features, perturb pixels); (3) get the black box's predictions on the perturbed set; (4) weight samples by proximity; (5) fit a sparse linear model on the weighted samples; its coefficients are the local explanation. Strength: model-agnostic, intuitive, fast. Limits: instability (different perturbation seeds → different explanations), only *locally* faithful, and in images the "features" are super-pixels — coarse.

## 21.3 SHAP — SHapley Additive exPlanations

**Idea:** from cooperative game theory — the Shapley value of a feature is its average marginal contribution to the prediction across all coalitions of features. SHAP computes/add-approximates these values so that `f(x) = base + Σ φ_i` (additivity). Properties: **local accuracy** (explanations add up to the prediction), **consistency** (if a model depends more on a feature, its attribution doesn't decrease), and global summaries (mean |SHAP| across patients = feature importance). Limits: correlated features share/split credit oddly; exact values are exponential — approximations (TreeSHAP for tree ensembles — fast and exact for trees; DeepSHAP) are used in practice.

```python
import shap
explainer = shap.TreeExplainer(gbm)          # exact for tree models
sv = explainer.shap_values(X_patient)        # per-feature contributions
shap.force_plot(explainer.expected_value, sv, X_patient)   # per-patient view
```

## 21.4 The clinical explanation artifact

A usable alert carries: the calibrated score **+ confidence band**; top-3 pushers and top-1 suppressor with attribution values *in plain clinical language*; similar past cases and their outcomes; a counterfactual ("had HbA1c been < 6.5, score would drop to 0.2"); and the model's stated limitations. LIME/SHAP supply the attributions; the artifact supplies the *framing* — attribution shows which feature pushed the score, **not** that the feature caused the disease.

## 21.5 Key terms

- **LIME** — local surrogate explanation by perturbation.
- **SHAP / Shapley value** — game-theoretic average marginal contribution per feature.
- **Local accuracy / additivity** — SHAP values sum to the prediction.
- **TreeSHAP** — exact fast SHAP for tree ensembles.
- **Attribution ≠ causation** — the standing caveat on all post-hoc explanation.

## 21.7 Review questions

1. Write LIME's five-step procedure and name its two stability limits.
2. State SHAP's additivity property and what TreeSHAP changes practically.
3. Compose the seven-field explanation artifact for a sepsis alert.

---

# Chapter 22. Privacy, Anonymization, and HIPAA

Health data is legally protected at every layer of the ML pipeline; HIPAA defines the rules in the US, and de-identification is the engineering response.

## 22.1 Chapter objectives

1. State what HIPAA regulates: PHI, Privacy Rule, Security Rule, BAAs.
2. Apply the two de-identification standards (Safe Harbor, Expert Determination).
3. Design a compliant ML pipeline from ingestion to deployment.

## 22.2 What HIPAA regulates

**PHI (Protected Health Information):** health data tied to an identifier. **Privacy Rule:** who may use/disclose PHI; **minimum necessary** principle; patient rights (access, amendment, accounting). **Security Rule:** administrative/physical/technical safeguards for electronic PHI (access control, audit trails, encryption). **Business Associate Agreement (BAA):** required contract with any vendor processing PHI — a cloud ML provider is a legal relationship, not just a service. Penalties are per-violation and tiered by negligence. GDPR imposes analogous duties in the EU (lawful basis, minimization, DPIAs).

## 22.3 De-identification

- **Safe Harbor:** remove all **18 identifier categories** — names; geography finer than state; all date elements (except year) tied to the patient; ages > 89 aggregated; contact details; SSN/MRN/insurance/account/license/vehicle/device/URL/IP; biometrics; full-face photos; any other unique identifier — *and* no actual knowledge that re-identification is possible.
- **Expert Determination:** a qualified statistician certifies that re-identification risk is "very small" — retains more utility (shifted dates, finer geography) at the cost of analysis.
- Distinguish **de-identified** (identifiers removed; still regulated data) from **anonymous** (re-identification risk negligible). Genomic data resists true anonymization.

## 22.4 A compliant ML pipeline

1. **Ingestion:** minimal necessary data only; pseudonymized keys (salted hash; key held separately); date-shifting per patient (preserve intervals).
2. **Text:** PHI scrubbing via NLP before any note leaves the clinical environment.
3. **Access:** role-based, logged; training environments separated from production EHR.
4. **Training:** on de-identified/pseudonymized data; consider **federated learning** when data cannot move (Unit V, Chapter 35); **differential privacy** for aggregate statistics.
5. **Deployment:** vendor BAAs; data-retention and model-change clauses; audit logs for every automated decision; breach-notification readiness.
6. **Governance:** IRB/ethics approval for research uses; DPIA for high-risk processing; documented data lineage.

## 22.5 Key terms

- **PHI** — protected health information; health data linked to identifiers.
- **Privacy / Security Rule** — use-disclosure governance / technical safeguards.
- **BAA** — Business Associate Agreement with PHI-processing vendors.
- **Safe Harbor / Expert Determination** — HIPAA's two de-identification standards.
- **Date-shifting / pseudonymization** — utility-preserving de-identification techniques.

## 22.6 Review questions

1. List any six of HIPAA's 18 Safe Harbor identifier categories.
2. Why is a cloud ML provider a "legal relationship" and what document governs it?
3. Design the de-identification steps for a notes+labs dataset destined for a shared training cluster.


*The official question bank for this unit — 18 questions with full model answers — is in **Appendix D** of this book.*
