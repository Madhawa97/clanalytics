export const filterInactivePlayers = async(teamId: string) => {
    const token = process.env.TOKEN;

    return `Team ID: ${teamId}, Token: ${token}`;
}
