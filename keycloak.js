import Keycloak from "keycloak-js";

const keycloakConfig = {
  url: "https://cicd.jatelindo.co.id/kc/",
  realm: "JPA",
  clientId: "career-web",
};

const keycloak = new Keycloak();
export default keycloak;
