import { makeAutoObservable, runInAction } from "mobx";
import {v4 as uuid} from 'uuid';
import agent from "../api/agent";
import { Project } from "../models/project";

export default class ProjectStore {

    projects: Project[] = [];
    selectedProject: Project | undefined = undefined;
    editMode = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadProjects = async () => {
        try{
            const projects = await agent.Projects.list();
            runInAction(() => {
                this.projects = projects;
            })
        }
        catch (error){
            console.log(error);
        }
    }

    createOrEditProject = (project: Project) => {
        project.id ? this.updateProject(project) : this.createProject(project)
    }

    createProject = (project: Project) => {
        project.id = uuid();
        project.creationDate = new Date().toISOString();
        agent.Projects.create(project).then(() => {
            this.projects = ([...this.projects, project]);
            this.openEditForm(false);
            this.selectProject(project.id);
        })
    }

    updateProject = (project: Project) => {
        agent.Projects.update(project).then(() => {
            this.projects = ([...this.projects.filter(x => x.id !== project.id), project])
            this.openEditForm(false);
            this.selectProject(project.id);
        })
    }

    deleteProject = (id: string) => {
        agent.Projects.delete(id).then(() => {
            this.projects = ([...this.projects.filter(x => x.id !== id)]);
            if(this.selectedProject?.id == id){
                this.selectProject();
                this.openEditForm(false);
            }
        })
    }

    selectProject = (id?: string) => {
        this.selectedProject = this.projects.find(p => p.id == id);
        this.openEditForm(false); //a voir si c'est nécessaire
    }

    openEditForm = (open: boolean) => {
        this.editMode = open;
    }
}
