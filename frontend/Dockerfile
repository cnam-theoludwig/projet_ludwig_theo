FROM node:22.15.0-slim AS node-pnpm
ENV TURBO_TELEMETRY_DISABLED=1
ENV DO_NOT_TRACK=1
WORKDIR /usr/src/app

FROM node-pnpm AS builder
COPY ./ ./
RUN pnpm install --global turbo@2.5.3
RUN turbo prune @repo/frontend --docker

FROM node-pnpm AS installer
COPY .gitignore .gitignore
COPY --from=builder /usr/src/app/out/json/ ./
COPY --from=builder /usr/src/app/out/package-lock.json ./package-lock.json
RUN npm clean-install
COPY --from=builder /usr/src/app/out/full/ ./
COPY turbo.json turbo.json

RUN pnpm --filter=@repo/frontend... exec turbo run build

FROM node-pnpm AS runner
ENV NODE_ENV=production
RUN npm install mime@4.0.7 tsx@4.19.3

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 applicationrunner
USER root
USER applicationrunner
COPY --from=installer --chown=applicationrunner:nodejs /usr/src/app/frontend/dist/cnam_web/browser ./frontend/dist/cnam_web/browser
COPY --from=installer --chown=applicationrunner:nodejs /usr/src/app/frontend/http-server.ts ./frontend/http-server.ts
WORKDIR /usr/src/app/frontend
CMD ["node", "--import=tsx", "./http-server.ts", "--path=./dist/cnam_web/browser"]
