node -r dotenv/config app.js dotenv_config_path="./config/.env"
node "./node_modules/mocha/bin/mocha" --recursive
node inspect
