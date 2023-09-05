
#Development command=========================
DEV_PORT = 3000
DEV_START_URL = http://localhost:$(DEV_PORT)

start-dev-application:
	cd application && PORT=$(DEV_PORT) BROWSER=none npm run start

start-dev-electron:
	cd electron && npm run build && cd build && ELECTRON_START_URL=$(DEV_START_URL) npm run start
#END Development command=====================




start-build-win-64:
	cd electron && npm run build && cd build && npm run package-win
