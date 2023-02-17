const getRoles = (objectRoles) => {
    const roles = [];

    for(i = 0; i<objectRoles.length; i++) {
        roles.push(objectRoles[i].rolName);
    };

    return roles;
};

module.exports = { getRoles };