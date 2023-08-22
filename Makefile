
#Development command=========================
DEV_PORT = 3003
DEV_START_URL = http://localhost:$(DEV_PORT)

start-dev-application:
	cd application && PORT=$(DEV_PORT) BROWSER=none npm run start

start-dev-electron:
	cd electron && ELECTRON_START_URL=$(DEV_START_URL) npm run start
#END Development command=====================
