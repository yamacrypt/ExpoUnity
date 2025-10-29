# syntax=docker/dockerfile:1
FROM node:20-bullseye

# Install system dependencies required for native module builds
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    python3 \
    build-essential \
    git \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

# Install dependencies first for better caching
COPY package.json ./
COPY app/package.json app/
COPY web/package.json web/
COPY packages/shared/package.json packages/shared/

RUN npm install

# Copy the rest of the repository
COPY . .

EXPOSE 19000 19001 19002 8081

ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0 \
    EXPO_USE_DEV_SERVER=true

CMD ["npm", "run", "--workspace", "app", "start", "--", "--tunnel"]
