# FROM node:20-alpine3.19

# WORKDIR /home/app

# COPY package*.json .
# COPY tsconfig.json .

# RUN npm install

# COPY src ./src

# RUN npm run build

# CMD ["npm" , "start"]

# the above one is for development but it copies the src folder which is not required in production so we need to create multi-stage build

FROM node:20-alpine3.19 as  base


# creating a stage thats going to be used for building the application

# Stage 1 :  Build stuff
FROM base as builder

WORKDIR /home/build

COPY package*.json .
COPY tsconfig.json .

RUN npm install

COPY src ./src

RUN npm run build


# stage 2 : runner 
FROM base as runner

WORKDIR /home/app

# copy only the necessary files from the builder stage to the runner stage ie the dist folder

COPY --from=builder /home/build/dist dist/
COPY --from=builder /home/build/package*.json .

RUN npm install --omit=dev

CMD ["npm", "start"]



