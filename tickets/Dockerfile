FROM node:alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .


FROM base AS development
CMD ["npm", "run", "dev"]


FROM base as builder
RUN npm run build


FROM node:alpine AS production
WORKDIR /app
COPY package*.json .
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/index.js"]