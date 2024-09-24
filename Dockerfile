# Use an official Node runtime as a parent image
FROM node:16-alpine AS base  # 1. Change the Node.js version if needed

# Set the working directory
WORKDIR /app  # 2. Change the working directory if your project structure requires it

# Install dependencies only when needed
FROM base AS deps
COPY package.json package-lock.json ./  # 3. Change to yarn.lock if using Yarn
RUN npm ci  # 3. Change to `yarn install --frozen-lockfile` if using Yarn

# Rebuild the source code only when needed
FROM base AS builder
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build  # 5. Change if you have a custom build script

# Development image, copy all the files and run next in development mode
FROM base AS runner
WORKDIR /app

ENV NODE_ENV development  # 4. Add any additional environment variables if needed

# Copy the build output and dependencies
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000  # 7. Change if your application runs on a different port

# Next.js starts the server in development mode
CMD ["npm", "run", "dev"]  # 6. Change if you have a custom start script for development
