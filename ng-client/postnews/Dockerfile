FROM node:latest AS build
WORKDIR /app
COPY package*.json .
RUN npm install
RUN npm install -g @angular/cli
COPY . .
RUN npm run build --configuration-produciton

FROM nginx:latest
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/postnews/browser /usr/share/nginx/html

EXPOSE 80