import { Module } from "application/models/Module";
const ModuleEnabled = (alias: string, modules: Module[]): boolean => {
    if (!modules || modules.length === 0){
        console.log('module not found: ',alias, modules);
        return false;
    }
        
    return modules.some((module) => module.alias === alias);
}

export default ModuleEnabled