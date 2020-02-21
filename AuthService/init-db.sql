CREATE DATABASE "billing-users"
    WITH
    OWNER = dips
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

CREATE DATABASE "billing-users-test"
    WITH
    OWNER = "test-runner"
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

CREATE SCHEMA "create"
    AUTHORIZATION "test-runner";

CREATE SCHEMA "get"
    AUTHORIZATION "test-runner";

CREATE SCHEMA "update"
    AUTHORIZATION "test-runner";

CREATE SCHEMA "delete"
    AUTHORIZATION "test-runner";

CREATE EXTENSION "uuid-ossp";