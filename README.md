# Convo AI

A polished, approval-first customer conversation dashboard. This is a **safe starter project**: it uses only mock data and cannot read, send, or automate WhatsApp messages.

## What is included

- Next.js, TypeScript, and Tailwind CSS dashboard
- Mock inbox, customer conversation, editable AI suggestion, and explicit approval action
- Clear “mock mode” status so nobody mistakes the demo for a live system
- Security and staged-integration guidance in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)

## Run it locally

1. Install Node.js 18.17 or later.
2. Copy `.env.example` to `.env.local`. Leave all values blank for the demo.
3. Run `npm install`.
4. Run `npm run dev`, then open `http://localhost:3000`.

## Staged WhatsApp integration

Do not add live sending until the approval workflow, access control, audit logging, and webhook verification are implemented and reviewed. The recommended path is:

1. Create a Meta WhatsApp Business app and configure a verified HTTPS webhook.
2. Store credentials only in server-side environment variables or a secrets manager.
3. Verify incoming webhook signatures, deduplicate events, and persist messages with minimal data retention.
4. Generate a server-side draft; require a signed-in human to review/edit/approve it.
5. Send only after an explicit approval record is written, then log Meta’s response without putting sensitive content in logs.

This starter deliberately has no WhatsApp SDK, webhook route, message API route, or send button.

## Publish to GitHub

The connected integration currently cannot write to the repository. Easiest upload path:

1. Download `convo-ai-starter.zip` from this task.
2. In the [convo-ai repository](https://github.com/kubellingham/convo-ai), select **Add file → Upload files**.
3. Drag the *contents* of the extracted `convo-ai-starter` folder into the page, then choose **Commit changes**.

Or, after installing GitHub Desktop: open the extracted folder as a repository, publish/push it to `kubellingham/convo-ai`.

## Before production

Read [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md), add authentication and a database, have a security review, and test against a Meta sandbox/test number first.
