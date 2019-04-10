export interface Branch {
  id: number,
  name: string,
  profilePic: string,
  twitter: string,
  about: string,
  location: string,
  email: string,
  phone: string
}

export interface BranchState {
  branches: Branch[]
}
