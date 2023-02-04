// make sure the right variables are being destructured
const { REDIS_CONNECTION_URL } = process.env;
const envVars = { REDIS_CONNECTION_URL };

function getEnv() {
  const isEnvValid = getIsEnvValid(envVars);
  console.log({ envVars })
  if (!isEnvValid) throw new Error("Env not valid");
  return envVars;
}

function getIsEnvValid<K extends string>(
  envObj: Record<K, any>
): envObj is Record<K, string> {
  return Object.values(envObj).every((val) => !!val && typeof val === "string");
}

export default getEnv;
