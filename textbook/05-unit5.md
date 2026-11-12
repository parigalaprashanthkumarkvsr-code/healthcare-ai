# UNIT V — Ethics, Governance & Regulatory Landscape

Accuracy gets a model into the literature; ethics, governance, and regulation decide whether it gets to a patient. This unit covers the bioethical principles, the bias and fairness problem, the regulatory pathways for Software as a Medical Device, responsible deployment, explainability as the currency of clinical trust, privacy-preserving federated learning, and the clinical-trial evidence that settles arguments.

# Chapter 30. Bioethical Principles and Ethical Frameworks for Healthcare AI

Medicine's ethics were built for individuals; healthcare AI inherits them and adds failure modes of its own — scale, opacity, and statistical discrimination.

## 30.1 Chapter objectives

1. State the four bioethical principles and apply each to an AI system.
2. Use structured ethical analysis (benefit–harm, consent, accountability) on a concrete deployment.
3. Recognize the ethical questions unique to AI: consent for data reuse, accountability gaps, and autonomy erosion.

## 30.2 The four principles, applied to AI

| Principle | Classical meaning | AI application | Characteristic failure |
|---|---|---|---|
| **Autonomy** | Patient's right to decide | Meaningful consent for data use; explanation of AI involvement; opt-outs honored | Black-box decisions patients cannot contest; hidden data reuse |
| **Beneficence** | Act for the patient's benefit | Deploy only where benefit is demonstrated (local validation) | Deploying for efficiency while care quality silently drops |
| **Non-maleficence** | First, do no harm | Harm auditing: who is hurt by errors, alert burden, automation bias | Silent degradation; harms falling on unexamined subgroups |
| **Justice** | Fair distribution of benefit and burden | Equal performance across populations; access beyond wealthy systems | Models trained on one population failing on another (Chapter 31) |

## 30.3 AI-specific ethical questions

1. **Consent for secondary data use.** Patients consented to treatment, not to model training. Options: broad consent, opt-out registries, or consent waivers for de-identified research — each with an ethical cost, and each shaped by law (Chapter 32).
2. **The accountability gap.** If an AI recommendation contributes to harm, who answers: the clinician who followed it, the hospital that deployed it, the vendor that trained it? Responsible deployment (Chapter 33) closes this gap with defined human oversight before go-live, not after the incident.
3. **Autonomy erosion.** Recommendation systems shape what clinicians see and order; ambient documentation shapes the record. Nudges are not neutral — their direction must be auditable.
4. **Resource allocation.** Predictive tools decide who gets a bed, a worklist slot, a care manager. Distributive justice is therefore a modeling property, not only a policy one.

> **Clinical in practice.** The ethics of a deployed model are decided at the moment its operating point is chosen. A sepsis model tuned for maximum sensitivity floods a ward with alerts (non-maleficence problem); tuned for precision, it misses the patients most likely to die (justice problem). There is no threshold without an ethical position.

## 30.4 Key terms

- **Bioethical principles** — autonomy, beneficence, non-maleficence, justice.
- **Accountability gap** — diffusion of responsibility for AI-influenced harm.
- **Secondary data use** — using care-generated data for model development.
- **Automation bias (ethical view)** — a transferred autonomy problem: the machine's framing silently narrows the clinician's.

## 30.5 Review questions

1. Apply the four principles to an autonomous retinopathy screening program.
2. Why is consent for secondary data use ethically distinct from consent for treatment?
3. Explain the accountability gap and name the deployment-stage control that narrows it.

---

# Chapter 31. Bias, Fairness, and Health Equity

Bias in healthcare AI is not a bug in the code; it is usually a faithful copy of bias in the data, the labels, and the delivery system — and fairness is a choice of which statistical definition of "fair" to serve.

## 31.1 Chapter objectives

1. Trace the sources of bias from history to label to deployment.
2. State the formal fairness definitions and why they cannot all hold at once.
3. Apply mitigation strategies and fairness audits across a model's lifecycle.

## 31.2 Where bias enters

1. **Historical bias** — the data records a biased world: referral patterns, access gaps, who got tested. A model predicting healthcare *costs* learned to under-predict the needs of Black patients who historically received less spending for equal illness (the widely cited Obermeyer et al., Science 2019 study — the fix was predicting need, not cost).
2. **Representation bias** — subgroups absent or thin in training data: darker skin in dermatology images, women in cardiac-trial cohorts, non-English speakers in notes.
3. **Measurement bias** — instruments behave differently across groups: pulse oximetry overreads SpO₂ in darker skin; some devices are calibrated on one anatomy.
4. **Label bias** — the ground truth itself is skewed: ICD codes reflect coding practice; a diagnosis requires access to care first.
5. **Aggregation bias** — one model for all subgroups hides subgroup-specific patterns.
6. **Deployment bias** — the tool is used differently than designed (or not used at all) across sites with different resources.

## 31.3 Fairness definitions — and the impossibility result

- **Group fairness:** *demographic parity* (equal positive-prediction rates across groups); *equalized odds* (equal true-positive and false-positive rates); *predictive parity/calibration within groups* (equal PPV).
- **Individual fairness:** similar patients treated similarly.
- **The theorem:** under non-trivial conditions, **calibration within groups and equalized odds cannot hold simultaneously** (except in degenerate cases) — because base rates differ. Every deployed system chooses which definition to satisfy; the choice is a value judgment, and it must be documented, not hidden in code.

## 31.4 Mitigation across the lifecycle

| Stage | Techniques |
|---|---|
| Pre-processing | Re-weight/rebalance training data; targeted collection for thin subgroups; check label definitions for proxy bias |
| In-processing | Fairness-constrained training; adversarial debiasing |
| Post-processing | Group-specific thresholds (controversial — legal and ethical review required); calibrated score adjustment |
| Process | Disaggregated evaluation before and after deployment; bias bug bounties; community input on target definitions |

The strongest mitigations are usually upstream: fix the *target variable* (need vs cost), collect the missing subgroup, and re-examine the label — before touching the loss function.

## 31.5 Fairness audit as a deliverable

A clinical model ships with: subgroup sample counts; per-subgroup sensitivity, specificity, PPV, and calibration curves; the chosen fairness definition and why; known limitations; and a monitoring plan. This is the model-card content (Chapter 33) that fairness regulation (Chapter 32) increasingly expects.

## 31.6 Key terms

- **Demographic parity / equalized odds / calibration within groups** — the three canonical group-fairness definitions.
- **Impossibility result** — calibration and equalized odds cannot both hold when base rates differ.
- **Proxy variable bias** — an allowed input (cost) standing in for a disallowed one (race, via spending patterns).
- **Fairness audit** — the documented, disaggregated evaluation shipped with a model.

## 31.7 Review questions

1. Reconstruct the Obermeyer cost-prediction finding: what was biased, and what was the fix?
2. State the fairness impossibility result and its practical consequence.
3. Why is "remove race from the inputs" an inadequate fairness strategy in healthcare?

---

# Chapter 32. Regulatory Landscape: FDA, CE Marking, and SaMD

A model that informs a clinical decision is a *device*. The FDA in the US and notified bodies under the EU MDR in Europe decide when software needs approval — and the rules are converging.

## 32.1 Chapter objectives

1. Define Software as a Medical Device (SaMD) and classify software by risk.
2. Describe the FDA pathways (510(k), De Novo, PMA) and the adaptive ideas (predetermined change control plans).
3. Describe CE marking under the EU MDR and compare the regimes.

## 32.2 SaMD — the definition that decides everything

**Software as a Medical Device (SaMD)** (IMDRF definition, adopted by regulators): software intended for a medical purpose that performs those purposes *without being part of a hardware medical device*. Classification turns on two axes — the *criticality* of the situation (serious vs non-serious) and the *significance* of the software's output (diagnose/treat vs triage/drive). A radiologist-facing triage tool and an autonomous diagnostic are different risk categories with different evidentiary burdens. Software that merely stores/transmits data or supports administrative work falls outside SaMD.

## 32.3 FDA pathways

| Pathway | Logic | When used |
|---|---|---|
| **510(k)** | Substantial equivalence to a legally marketed predicate device | Most CAD/CDS imaging tools |
| **De Novo** | New device type, low–moderate risk, no predicate | First-of-kind categories (IDx-DR used De Novo) |
| **PMA** | Highest-risk class III; clinical data required | High-risk therapeutic/diagnostic AI |

FDA specifics for AI/ML: **Predetermined Change Control Plans (PCCP)** — the 2023+ guidance lets a submission pre-specify *how the model may be updated* (retraining protocol, acceptance criteria, update validation), turning the historical "locked model" requirement into managed adaptation. FDA also maintains a public list of AI/ML-enabled devices (growing past a thousand authorizations), most via 510(k).

## 32.4 CE marking and the EU MDR

Under the **EU Medical Device Regulation (MDR, 2017/745)**, software with a medical purpose is a device and needs **CE marking** through a notified body, with clinical evidence proportionate to class (I → IIa → IIb → III). Requirements include clinical evaluation, post-market surveillance, and — for software — specific documentation (intended purpose, benefit–risk, usability). The **EU AI Act** layers on top: high-risk AI systems (which include medical devices) need risk management, data governance, transparency, human oversight, and accuracy/robustness documentation. GDPR governs the data.

## 32.5 Comparing the regimes and the shared lesson

| Dimension | FDA (US) | EU MDR/AI Act |
|---|---|---|
| Mechanism | Risk-based pathways; predicate system | Class-based conformity assessment via notified bodies |
| Adaptation | PCCP for planned updates | Change requires re-assessment; surveillance duties |
| Ongoing oversight | Post-market surveillance; device list | Post-market surveillance; vigilance reporting |

Shared lesson: regulators approve *claims*, not models — the intended use, the population, the operating point, and the human-oversight design are part of the authorization, and drifting from them is a regulatory event.

## 32.6 Key terms

- **SaMD** — software with a medical purpose, not part of a hardware device.
- **510(k) / De Novo / PMA** — FDA's three main pathways.
- **PCCP** — Predetermined Change Control Plan: pre-authorized update protocol.
- **CE marking / MDR** — EU conformity regime for medical devices.
- **Intended use** — the claim the authorization covers; the boundary of lawful deployment.

## 32.7 Review questions

1. Classify: (a) a worklist-triage hemorrhage tool; (b) an autonomous DR screener. Which pathways fit?
2. What problem does a Predetermined Change Control Plan solve, and what does it pre-authorize?
3. Why is "intended use" the most important field in a SaMD authorization?

---

# Chapter 33. Responsible Deployment and Governance

Between approval and bedside lies the part of the lifecycle that is nobody's regulatory mandate and everyone's job: local validation, monitoring, oversight, and governance that keeps the model worthy of trust over years.

## 33.1 Chapter objectives

1. Design a deployment plan: local validation, shadow mode, staged rollout.
2. Implement post-deployment monitoring for drift, performance, and equity.
3. Define the governance structure: model cards, incident reporting, review boards, liability.

## 33.2 The deployment plan

1. **Local validation before any live use** — re-evaluate the model on *this hospital's* data (different demographics, coding practice, devices). Performance transfer is the exception; verify it.
2. **Shadow mode** — run silently alongside care; compare model behavior to actual clinical outcomes and workflow fit; tune thresholds on local operating characteristics.
3. **Staged rollout** — one unit, then a service, then the institution; each stage with predefined success criteria and a rollback plan.
4. **Human-oversight design** — who acts on the output, with what information, and with what authority to override; automation-bias safeguards (Chapter 34) built into the interface.

## 33.3 Post-deployment monitoring

- **Data drift** — input distributions shift (new lab analyzers, new EHR version, new referral pattern); monitored by distribution tests on features.
- **Concept drift** — the outcome relationship changes (new treatment guidelines, a pandemic); monitored by outcome-linked performance on prospectively labeled samples.
- **Equity monitoring** — per-subgroup performance dashboards, because drift is rarely uniform.
- **Incident reporting** — a defined channel (and, where required, regulatory vigilance reporting) when the model contributes to harm; the clinical analog of pharmacovigilance.

## 33.4 Governance artifacts and structure

- **Model cards / technical documentation** — intended use, training data provenance, evaluation (including subgroup), operating point, known limitations, update history.
- **Governance committee** — clinical, data-science, informatics, ethics, and legal membership; owns go/no-go decisions, threshold changes, and retirement decisions.
- **Versioning and reproducibility** — every deployed decision traceable to a specific model version, data snapshot, and code commit.
- **Liability allocation** — contracts with vendors define responsibility for updates, defects, and monitoring; clinical accountability remains with the treating team (Chapter 30's accountability gap, closed by process).

## 33.5 Key terms

- **Local validation** — re-evaluation of a model on the deploying institution's data.
- **Shadow mode** — silent parallel running before live use.
- **Data drift / concept drift** — input-distribution shift / outcome-relationship shift.
- **Model card** — standardized documentation of a model's intended use, data, and performance.
- **Model governance committee** — the cross-functional body owning deployment decisions.

## 33.6 Review questions

1. Give three reasons a model with strong published external validation still needs local validation.
2. Distinguish data drift and concept drift with one clinical example each.
3. List the minimum fields of a model card for a deployed sepsis model.

---

# Chapter 34. Explainable AI and Building Clinical Trust

Chapter 21 supplied the explanation machinery (LIME, SHAP); this chapter is about the *product* of that machinery — trust that is earned, calibrated, and maintained.

## 34.1 Chapter objectives

1. Distinguish trust, calibrated trust, and automation bias/under-trust.
2. Design explanations that support the clinical decision instead of decorating the score.
3. Recognize explanation limits: attribution ≠ causation, instability, and gaming.

## 34.2 The trust landscape

- **Over-trust (automation bias):** the clinician stops checking; model errors pass through. Safeguards: confidence display with uncertainty, mandatory confirmation steps for high-stakes actions, periodic "challenge" audits.
- **Under-trust:** early failures or opaque reasoning cause wholesale disuse of a useful tool. Safeguards: honest failure reporting, explanations, and gradual responsibility transfer as evidence accumulates.
- **Calibrated trust — the goal:** trust proportional to demonstrated, locally measured, per-subgroup reliability. It is an *operational property* (does the clinician's agreement rate track the model's local accuracy?), not a feeling.

## 34.3 Designing the explanation artifact

For a deployed clinical score, the usable artifact carries (Chapter 21's components, now as design requirements):

1. The **calibrated score** with an uncertainty band.
2. **Top attributions** in plain clinical language ("elevated lactate, rising over 6 h — pushed score up strongly").
3. **Similar past cases** and their outcomes.
4. A **counterfactual** where one exists ("if cultures drawn on arrival, score would have been higher").
5. The model's **stated limitations** and when it should not be trusted.

Two evidence notes discipline the design: explanations measurably change reviewer behavior (studies show accuracy and time shifts when rationale is present), and **attribution is not causation** — a SHAP value ranks feature influence on the prediction, not on the disease.

## 34.4 When explanations mislead

Unfaithful explanations (LIME instability across seeds), plausible-sounding attributions that the model does not actually depend on, explanation *gaming* (models rewarding shortcut features that produce convincing narratives), and the human tendency to accept any fluent reason (the same automation bias in a new costume). Governance (Chapter 33) answers with faithfulness checks and periodic review of whether displayed rationales match model behavior.

## 34.5 Key terms

- **Calibrated trust** — trust matched to measured, local, per-subgroup reliability.
- **Automation bias safeguard** — interface/process controls that keep human checking alive.
- **Explanation artifact** — the designed package: score, attributions, similar cases, counterfactual, limitations.
- **Faithfulness** — the degree to which an explanation reflects the model's actual computation.

## 34.6 Review questions

1. Define calibrated trust and state how you would measure it in a live radiology workflow.
2. Assemble the five components of a clinical explanation artifact for an ECG-alert model.
3. Give two ways an explanation can be unfaithful, and one governance control for each.

---

# Chapter 35. Federated Learning and Privacy-Preserving AI

Hospitals cannot share patient data; models can learn from it anyway. Federated learning trains a shared model while the data never leaves each site — privacy preservation built into the training loop, not bolted on after.

## 35.1 Chapter objectives

1. Explain federated learning's training loop and the FedAvg protocol.
2. Distinguish cross-silo and cross-device settings and their challenges (non-IID data above all).
3. Combine FL with secure aggregation and differential privacy into an honest threat model.

## 35.2 The federated training loop

1. A coordinating server distributes the current global model to participating sites.
2. Each site trains locally on its own patients (data never moves).
3. Sites return **only model updates** (gradients/weights).
4. The server averages them (**FedAvg** — typically weighted by site dataset size) into a new global model.
5. Repeat for rounds until convergence; then validate, and deploy per the governance of Chapter 33.

```
        ┌──────────── global model ────────────┐
        ▼                  ▼                   ▼
   [Hospital A]      [Hospital B]         [Hospital C]
   local train       local train          local train
   (data stays)      (data stays)         (data stays)
        │ updates          │ updates            │ updates
        └─────────── secure aggregation ─────────┘
                            ▼
                    new global model
```

## 35.3 Cross-silo vs cross-device; the hard problems

- **Cross-silo** (a few hospitals or research centers; reliable, high-capacity participants) is the healthcare standard — e.g., multi-institution model consortia.
- **Cross-device** (thousands of phones/wearables) has unreliable participants and tiny per-device data.
- **Non-IID data:** each hospital's population, coding practice, and devices differ, so local updates differ from the global distribution; naive averaging degrades performance. Remedies: personalized layers per site, careful normalization, and robust aggregation.
- **Stragglers and dropout:** sites fail mid-round; protocols must tolerate partial participation.
- **Evaluation honesty:** each site evaluates the global model on held-out local data; report per-site results, not only the pooled average.

## 35.4 The honest threat model

Model updates can leak information (gradient-inversion attacks can reconstruct inputs from naive gradient sharing; membership-inference attacks test whether a patient was in training). Defenses, combined:

1. **Secure aggregation** — the server sees only the sum of updates, never individual updates (cryptographic masking).
2. **Differential privacy** — noise added to updates, bounding any single patient's influence, with a stated privacy budget (ε).
3. **Federated evaluation and governance** — the same access rules, audit logs, and model cards as any pipeline (Chapter 33).

FL therefore *reduces* but does not eliminate privacy risk — the honest claim is "data minimization plus DP", not "fully private".

## 35.5 Key terms

- **Federated learning / FedAvg** — decentralized training / weight-by-size averaging of local updates.
- **Cross-silo / cross-device** — few reliable institutions / many unreliable endpoints.
- **Non-IID federation** — sites with differing data distributions.
- **Secure aggregation** — server sees sums, not individual updates.
- **Differential privacy (ε)** — bounded influence of any one patient, bought with noise.

## 35.6 Review questions

1. Write the five steps of the FedAvg loop and state where patient data physically travels.
2. Why is non-IID the defining challenge of healthcare federation, and what are two remedies?
3. Name two attacks on federated updates and one defense against each.

---

# Chapter 36. Clinical Validation, Trials, and the Future of Healthcare AI

The final arbiters are prospective studies: does the model improve outcomes, workflows, or decisions in real care? This chapter covers how AI is trialed, what the landmark results taught, and where the field is heading.

## 36.1 Chapter objectives

1. Distinguish retrospective validation from prospective and randomized evaluation of AI.
2. Describe landmark AI trials and the design questions they settle.
3. Map the future: foundation models, multimodal agents, and the governance they demand.

## 36.2 The evidence ladder

1. **Retrospective validation** — model vs archived labels; necessary, weak (selection and label effects).
2. **Prospective validation** — model runs in live care, but decisions remain clinician-made; tests shift and workflow.
3. **Randomized controlled trials (RCTs)** — patients or encounters randomized to AI-assisted vs usual care; the only design that isolates the AI's *effect*. Key variants: superiority vs non-inferiority, cluster randomization (by clinician/unit, avoiding contamination), and endpoints that matter (detection rates, time-to-event, outcomes, workload).

## 36.3 Landmark trials and their lessons

- **Colonoscopy (CADe):** multiple RCTs showed AI-assisted colonoscopy increases adenoma detection rates — the strongest real-outcome evidence for medical imaging AI, with a caution: detection gains can fade as endoscopists adapt, and cluster designs matter.
- **Mammography (MASAI, Sweden):** AI-supported screening was non-inferior on cancer detection with materially reduced screen-reading workload — a workload, not autonomy, claim.
- **Diabetic retinopathy (IDx-DR deployment studies):** demonstrated autonomous screening's operational feasibility in primary care, with measurable referral rates and fall-back rates.
- **Sepsis models:** prospective deployments repeatedly showed that alert burden and clinician response — not AUROC — determine clinical effect; some trials found no outcome improvement without workflow redesign.

The meta-lesson: **the trial endpoint must match the claim.** A detection-rate claim, a workload claim, and an outcome claim are three different trials.

## 36.4 The future, honestly

1. **Foundation models for medicine:** large multimodal models pre-trained across imaging, notes, and genomics, adapted to many tasks — promising for annotation efficiency and generalist reasoning; demanding on validation, bias, and regulation ( Chapters 31–33).
2. **Ambient clinical intelligence:** documentation and summarization agents already in clinics; their risks are accuracy, PHI handling, and note-truth drift.
3. **Agentic decision support:** multi-step AI assistants proposing orders and plans — raises the autonomy/oversight question (Chapter 30) at a new intensity.
4. **Continuous, personalized models:** wearables + CGM + EHR enabling lifelong individual baselines ("your normal") instead of population thresholds.
5. **Federated and privacy-preserving scale-up** (Chapter 35) as the default research infrastructure across institutions.
6. **Regulatory maturation:** PCCP-style adaptive oversight (Chapter 32) extended to continuously learning systems.

## 36.5 Key terms

- **Prospective vs retrospective validation** — live-care evaluation vs archived-label evaluation.
- **Cluster randomization** — randomizing by clinician/unit to avoid contamination.
- **Non-inferiority trial** — showing the AI-assisted pathway is not meaningfully worse.
- **Foundation model** — a large pre-trained multimodal model adapted to many downstream tasks.
- **Endpoint–claim match** — the trial must test the specific claim being made.

## 36.6 Review questions

1. Why can retrospective validation never settle an outcome claim?
2. What did the colonoscopy CADe trials and MASAI each prove — and what does each *not* prove?
3. Name three future directions and one governance demand each creates.


*The official question bank for this unit — 18 questions with full model answers — is in **Appendix D** of this book.*
