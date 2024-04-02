export default class Associations {
    private models: any;
    constructor(models: any) {
        this.models = models;
    }

    all() {
        const methodsToIgnore: string[] = ['constructor', 'all'];
        let methods: string[] = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
        methods = methods.filter(method => !methodsToIgnore.includes(method));
        // invoke the association method for each model
        for (let method of methods) {
            this[(method as keyof Associations)]();
        }
    }
}