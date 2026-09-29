# Convo AI architecture and security

## Product boundary

Convo AI should propose replies, never silently act on them. A human must be able to inspect, edit, and explicitly approve every outbound message. The included UI demonstrates that boundary but has no live connection.

## Proposed production flow

```text
WhatsApp Cloud API → verified webhook → queue → message store
                                         ↓
                                  draft-generation service
                                         ↓
operator dashboard → edit + approve → approval audit record → outbound worker → WhatsApp Cloud API
```

Keep inbound webhooks fast: validate, persist the event id, and enqueue work. Process retries and outbound delivery separately. Use idempotency keys for both Meta events and sends.

## Components

| Component | Responsibility | Security baseline |
| --- | --- | --- |
| Webhook endpoint | Receive Meta events | HTTPS, signature verification, rate limiting, replay protection |
| Queue/worker | Process events and sends | Idempotency, retry policy, least-privilege credentials |
| Application database | Conversations, drafts, approvals | Encryption at rest, scoped service account, retention policy |
| Dashboard | Human review and approval | SSO/authentication, role-based access, CSRF protection |
| AI provider adapter | Generate draft replies | Server-only key, data minimization, timeout/fallback |
| Audit log | Explain decisions and approvals | Append-only access pattern, restricted viewing, redaction |

## Required controls before going live

- Authenticate all staff; define roles such as viewer, responder, and administrator.
- Record who edited/approved a draft, when, which model/prompt version created it, and which final text was sent.
- Treat webhook verification tokens, WhatsApp access tokens, database credentials, and AI keys as secrets. Never expose them in `NEXT_PUBLIC_*` variables, browser code, git history, screenshots, or logs.
- Verify Meta webhook signatures against the raw request body before parsing or processing events.
- Encrypt data in transit and at rest. Minimize retained message content and support deletion requests.
- Implement rate limits, per-customer send controls, content policy checks, and a kill switch for outbound delivery.
- Log event IDs and outcome metadata, not unrestricted customer message bodies or tokens.
- Obtain appropriate customer consent and comply with WhatsApp policy plus applicable privacy law before messaging.

## Suggested data model

- `conversation`: customer reference, channel, status, timestamps
- `message`: direction, body (encrypted where appropriate), provider event ID, timestamps
- `draft`: source message, generated content, model/prompt version, status
- `approval`: draft ID, editor/approver identity, final content, timestamp
- `delivery`: approved message ID, idempotency key, provider result, timestamp

An outbound worker must require an approval record linked to the exact final message content. “Draft generated” is never sufficient authorization to send.

## Rollout sequence

1. Keep this mock dashboard; validate the review experience with internal test data.
2. Add authentication, persistent storage, and audit records.
3. Add signed inbound webhook handling against a Meta test number—still no outbound sends.
4. Add draft generation and staff review, with sends disabled by a feature flag.
5. Enable a small, monitored outbound pilot after security and policy review.
6. Expand only with monitoring, incident response, and a tested disable switch.
