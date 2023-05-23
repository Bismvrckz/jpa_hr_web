FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . /app/
COPY .env /app/
RUN yarn install 

ENV PORT=3000
ENV DB_HOST=127.0.0.1
ENV DB_USER=root
ENV DB_PASSWORD=07mar200412430
ENV DB_NAME=JPA_HR_WEB
ENV LOCAL_API_URL='http://localhost:3000'

ENV SECRET_WORD="ABCDEF"
ENV NEXTAUTH_SECRET="Czg0WrtmJjl/SB373Nc9UaY9TRzwXmh6Hlli34Pgmu0="
ENV NEXTAUTH_URL=http://localhost:3000

RUN yarn sequelize db:migrate
RUN yarn sequelize db:seed:all

# Rebuild the source code only when needed
FROM node:16-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN yarn build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 bloggroup
RUN adduser --system --uid 1001 bloguser

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=bloguser:bloggroup /app/.next/standalone ./
# COPY --from=builder --chown=bloguser:bloggroup /app/.next/static ./.next/static

USER bloguser

EXPOSE 3000

CMD ["yarn", "start"]