FROM node:18
ARG VITE_SERVER_URL=http://localhost:4173
ENV VITE_SERVER_URL=$VITE_SERVER_URL
WORKDIR /frontend
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 4173
RUN npm run build
