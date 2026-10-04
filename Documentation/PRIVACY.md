# AUREX Privacy Policy

**Last updated:** October 4, 2026

AUREX ("AUREX", "we", "our", or "the App") is a GitHub App that analyzes GitHub pull requests for potential security vulnerabilities and provides risk-aware security findings and remediation assistance.

This Privacy Policy explains what information AUREX processes when you install or use the AUREX GitHub App.

## 1. Information AUREX Processes

Depending on the permissions granted during installation, AUREX may process:

- GitHub account and installation information required to authenticate the App.
- Repository metadata.
- Pull request metadata.
- Pull request diffs and changed source-code files.
- GitHub checks, review information, and related workflow information required by enabled features.
- Security-related information required to publish analysis results.
- Technical logs and application diagnostic information.
- Information voluntarily provided when contacting the project maintainers.

AUREX processes repository and pull request content only to provide its security-analysis functionality.

## 2. How AUREX Uses Information

AUREX may use processed information to:

- Detect security-sensitive code patterns and potential vulnerabilities.
- Classify findings using security standards such as CWE and OWASP.
- Calculate risk and confidence assessments.
- Generate remediation suggestions for supported findings.
- Validate supported remediation candidates.
- Publish findings and validation results back to GitHub pull requests.
- Generate SARIF security-analysis results.
- Operate the AUREX dashboard and application.
- Diagnose errors and improve reliability.

AUREX does not sell repository content or personal information.

## 3. AI-Assisted Processing

AUREX may optionally use the Google Gemini API for AI-assisted patch generation and security explanations.

When AI-assisted functionality is enabled, relevant code context required for the requested operation may be sent to Google Gemini.

AUREX's deterministic security analysis does not require Gemini for every finding.

Users should review Google's applicable privacy and data-processing policies before enabling AI-assisted functionality for repositories containing sensitive information.

## 4. Data Storage

AUREX may temporarily or persistently store information required to operate the application, including security findings, scan metadata, validation results, application state, and diagnostic information.

The specific information retained depends on the application's configuration and enabled functionality.

Users should not assume that AUREX provides indefinite or guaranteed retention of repository data.

## 5. GitHub Permissions

AUREX uses GitHub App permissions to access the repository and pull-request information required for its functionality.

The permissions requested by AUREX are intended to follow the principle of least privilege.

Users can review and manage an installation's repository access through GitHub's application settings.

## 6. Security

AUREX is designed with security-focused controls including:

- GitHub App authentication.
- Webhook signature verification.
- Environment-based secret configuration.
- Restricted application access.
- Docker-based sandbox validation for supported runtime validation.
- Resource limits for sandbox execution.
- Network restrictions during sandbox validation.
- Fail-closed behavior when required runtime validation infrastructure is unavailable.

No security system can guarantee complete protection against every threat.

## 7. Third-Party Services

AUREX may use the following third-party services:

- GitHub APIs and GitHub Actions for repository integration and validation workflows.
- Google Gemini API for optional AI-assisted functionality.

These services have their own terms and privacy policies.

## 8. Data Security

Reasonable technical measures are used to protect application credentials and processed information. However, no method of electronic storage or transmission can be guaranteed to be completely secure.

Users are responsible for maintaining appropriate security controls on their own GitHub accounts and repositories.

## 9. User Rights and Data Requests

For questions regarding information processed by AUREX, data deletion requests, or privacy concerns, contact the project maintainers through the support channel listed on the AUREX GitHub Marketplace listing.

## 10. Changes to This Policy

This Privacy Policy may be updated when AUREX's functionality, data processing practices, or applicable requirements change.

The latest version will be maintained in the AUREX repository.

## 11. Contact

For privacy-related questions, please contact the AUREX maintainers through the support information provided in the GitHub Marketplace listing.

---

AUREX is an independent open-source project and is not affiliated with GitHub, Inc. or Google LLC.