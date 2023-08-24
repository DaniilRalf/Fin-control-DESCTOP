export class ElectronBus {

    /** global electron object */
    public electron: any

    /** electron bus for render */
    public ipcRendererElectron: any

    constructor() {
    }

    /** electron bus events */
    public async electronEvents<DATA_TYPE>(eventType: any, data: DATA_TYPE): Promise<any> {
        try {
            return await this.ipcRendererElectron.invoke(eventType, data)
        } catch (e) {
            // TODO: add error handler
        }
    }

}
