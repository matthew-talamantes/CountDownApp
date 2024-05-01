FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY src ./src
COPY public ./public
COPY next.config.mjs .
COPY tsconfig.json .
COPY tailwind.config.ts .
COPY postcss.config.mjs .
COPY .env.local .

ENV NEXT_TELEMETRY_DISABLED 1

# CMD npx next dev -H 172.150.199.4
# CMD ["npm", "run", "dev", "-H", "172.150.199.4"]
CMD ["npm", "run", "dev"]