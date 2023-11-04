export class TaskClass {
  name: string
  description: string
  completed: boolean
  id: number
  constructor(id:number, name='', description='', completed=false){
    this.id=id
    this.name=name
    this.description=description
    this.completed=completed
  }
}

export type TaskData = InstanceType<typeof TaskClass> 