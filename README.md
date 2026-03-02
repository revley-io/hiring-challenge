# Revley hiring challenge

<img width="1364" height="863" alt="image" src="https://github.com/user-attachments/assets/92c58930-0b12-42a8-a8fe-e817a5e41b85" />


This repo contains a sample subscription billing system (NestJS) and a customer portal (Next.js). Your goal is to implement a minimal “customer subscription portal” experience that lets a customer view their subscriptions.

The objective is to simulate day-to-day work at Revley: interpreting loosely defined requirements, navigating an unfamiliar codebase, making meaningful changes, and verifying correctness.

- Timebox: ~1–2 hours.
- Use of AI tools is allowed. Please mention which tools you used in the PR description.
- You are responsible for the quality/correctness of your submission. We prefer a small, high-quality change set over lots of code.

## Process

### Git
1. Clone this repo locally.
2. Create a new **private** GitHub repository under your own account (do not fork).
3. Add your new private repo as a remote (e.g. `origin`) and push your branch(es).
2. Complete the requirements in **Challenge** below.
   - Aim for a clean, reviewable commit history.
3. Open a pull request from your branch.
   - Include a concise summary of changes and how you validated them (tests/commands).
4. Add shrish@revley.ai as a collaborator on your private repository.

### Running the services
Terminal session 1: backend
```bash
cd billing-backend
npm i
cp .env.example .env

npx supabase start  # will take some time
# copy SUPABASE_PUBLISH_KEY and SUPABASE_SECRET_KEY from the output into .env
# (use `npx supabase status` to re-print if needed)

npm run start:dev   # will auto-reload on changes

# Navigate to http://localhost:3000/docs for swagger docs

# To run e2e tests which hit controller + supabase db
npm run test:e2e
```

Terminal session 2: frontend
```bash
cd customer-portal-frontend
npm i
npm run dev

# Navigate to http://localhost:3001/
```

### Current usage
Currently the frontend **mocks** all API requests.

1. Go to frontend (http://localhost:3001/)
2. Enter an email
   - Right now only `test@example.com` is accepted.
3. You should be redirected to a billing overview page
   - All data on this page is mocked (until you complete the challenge).

### Challenge

#### Allow customers to view their subscriptions
Implement real subscription data end-to-end.

1. Add endpoint(s) to the billing backend to return the subscriptions for a customer.
2. Replace the mocked API calls on the frontend (see `customer-portal-frontend/lib/api.ts`) to call your backend.
3. You do **not** need to implement authentication. Payment method information can remain mocked.

Before implementing, skim the codebase to understand existing patterns. Follow best practices for code quality and testing.

#### Fix performance issue with /subscriptions
A developer is noticing that, at scale, `GET /subscriptions` becomes slower than expected when there are many subscriptions.

- Review the current implementation and identify why it’s inefficient.
- Besides pagination, address the underlying inefficiency.
- Implement the fix in a **separate commit**.

#### Overall suggestions for improvement
Describe one enhancement you would propose for the customer portal. This is your opportunity to demonstrate product sense and engineering depth.

- Keep it concise and clear.
- Save it as a Markdown file in this repo and include it in the PR.

## Submission requirements (strict)
- Upload your solution to a **private** GitHub repository under your own account (do not fork).
- Add shrish@revley.ai as a collaborator on that private repository.
- Open a PR from your working branch.
- PR description must include:
  - what you changed (brief)
  - how you validated it (commands/tests)
  - which AI tools you used (if any)
- Include a Markdown file with your “Overall suggestions for improvement”.
- The performance fix must be in a separate commit.
