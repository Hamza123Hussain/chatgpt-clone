interface Message {
  text: string
  CreatedAt: admin.firestore.Timestamp
  user: {
    _id: string
    name: string
    avatar: string
  }
}
