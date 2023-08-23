// const { contextBridge } = require('electron')
//
// contextBridge.exposeInMainWorld('versions', {
//     node: () => process.versions.node,
//     chrome: () => process.versions.chrome,
//     electron: () => process.versions.electron
//     // we can also expose variables, not just functions
// })

const preloadApp = (): void => {
    window.addEventListener('DOMContentLoaded', () => {
        const replaceText = (selector: string, text: string) => {
            const element = document.getElementById(selector)
            if (element) element.innerText = text
        }

        for (const dependency of ['chrome', 'node', 'electron']) {
            replaceText(`${dependency}-version`, process.versions[dependency])
        }
    })
}
export default preloadApp()
