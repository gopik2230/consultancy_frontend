export const getRoleName = (roleId) => {
    const roles = {
      1: 'candidate',
      2: 'client',
      3: 'super_admin'
    };
    return roles[roleId] || '';
  };