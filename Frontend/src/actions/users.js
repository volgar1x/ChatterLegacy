export function fetchUser(userId, server = '') {
  return
    fetch(`${server}/api/users/${userId}`)
    .then(resp => resp.json())
    .then(({user}) => user);
}
