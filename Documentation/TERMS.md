# AUREX Terms of Service

**Last updated:** October 4, 2026

These Terms of Service ("Terms") govern your use of AUREX, including the AUREX GitHub App, associated software, documentation, and services.

By installing or using AUREX, you agree to these Terms.

## 1. Description of the Service

AUREX is a security-analysis tool for GitHub pull requests.

It analyzes supported source-code changes, identifies potential security vulnerabilities, provides risk and confidence assessments, generates remediation assistance for supported findings, and can validate supported remediation candidates.

AUREX is an automated security-assistance tool and is not a replacement for professional security review.

## 2. Eligibility and Authorization

You may use AUREX only when you have the authority to install the application on the relevant GitHub account, organization, repository, or other resources.

You are responsible for ensuring that your use of AUREX complies with applicable laws, regulations, contracts, and organizational policies.

## 3. Repository Access

When AUREX is installed on a repository, the application may access repository and pull-request information according to the GitHub permissions granted during installation.

You are responsible for reviewing the permissions requested by AUREX before installation.

## 4. Acceptable Use

You agree not to use AUREX to:

- Access repositories or information without authorization.
- Circumvent GitHub access controls.
- Abuse or interfere with GitHub services.
- Attempt to compromise AUREX or its infrastructure.
- Use AUREX to perform unauthorized security testing against systems you do not own or have permission to test.
- Deliberately submit malicious payloads intended to compromise infrastructure operated by the AUREX maintainers.
- Use AUREX in violation of applicable laws or regulations.

Security testing should be performed only against systems and repositories for which you have appropriate authorization.

## 5. Automated Analysis

AUREX uses automated security analysis and may use AI-assisted functionality.

Automated findings can contain false positives, false negatives, incomplete analysis, or incorrect remediation suggestions.

You are responsible for reviewing AUREX findings and proposed changes before relying on them in production environments.

## 6. AI-Assisted Features

Some AUREX features may use third-party AI services, including Google Gemini.

AI-generated suggestions may be incomplete, inaccurate, insecure, or unsuitable for a particular application.

You are responsible for reviewing and validating AI-generated output before applying it to production code.

## 7. Validation

AUREX may use isolated Docker-based validation for supported remediation workflows.

Successful validation does not guarantee that a proposed change is secure, correct, or suitable for production.

Validation results should be treated as security evidence rather than a security guarantee.

## 8. GitHub and Third-Party Services

AUREX depends on third-party services including GitHub and, where enabled, Google Gemini.

Your use of those services remains subject to their respective terms and policies.

AUREX does not control the availability, operation, or policies of third-party services.

## 9. Intellectual Property

The AUREX source code is provided under the license included in the project repository.

You retain ownership of your repositories, source code, and other content processed by AUREX.

You are responsible for ensuring that you have the necessary rights to submit content to AUREX and any enabled third-party services.

## 10. Availability

AUREX may be modified, interrupted, suspended, or discontinued at any time.

No guarantee is made that the application will be available continuously or without errors.

## 11. Disclaimer

AUREX is provided on an "as is" and "as available" basis.

AUREX does not guarantee that:

- All vulnerabilities will be detected.
- All detected findings are genuine vulnerabilities.
- All generated patches are correct.
- All validation results are complete.
- A repository or application will be secure after using AUREX.
- AUREX will prevent security incidents or breaches.

Security decisions remain the responsibility of the user and the organization operating the affected software.

## 12. Limitation of Liability

To the maximum extent permitted by applicable law, the AUREX maintainers will not be liable for indirect, incidental, consequential, special, or punitive damages arising from or related to the use of AUREX.

This includes, without limitation, loss of data, loss of revenue, security incidents, service interruptions, or damage resulting from reliance on automated findings or generated remediation.

## 13. Changes to These Terms

These Terms may be updated as AUREX evolves.

The latest version will be maintained in the AUREX repository.

Continued use of AUREX after material changes may constitute acceptance of the updated Terms where permitted by applicable law.

## 14. Contact

For questions regarding these Terms, contact the AUREX maintainers through the support information provided in the GitHub Marketplace listing.

---

AUREX is an independent open-source project and is not affiliated with GitHub, Inc. or Google LLC.