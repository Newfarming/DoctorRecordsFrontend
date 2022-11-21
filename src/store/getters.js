const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  permission_type: state => state.user.permission_type,
  permission_name: state => state.user.permission_name
}
export default getters
