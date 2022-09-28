###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM amd64/node:16-alpine As development

COPY --chown=node:node package*.json ./
COPY --chown=node:node yarn.lock ./

RUN yarn

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM amd64/node:16-alpine As build

ARG TOKEN
ARG CLIENT_ID

WORKDIR /app

COPY --chown=node:node package*.json ./

COPY --chown=node:node . .

RUN yarn build

ENV NODE_ENV production

RUN yarn --production && yarn cache clean

USER node

###################
# PRODUCTION
###################

FROM amd64/node:16-alpine As production


# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /app/package*.json ./
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

EXPOSE 80

# Start the server using the production build
CMD [ "yarn", "start" ]