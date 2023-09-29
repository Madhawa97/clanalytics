import axios from "axios";

export const filterInactivePlayers = async (clanId: string) => {
  const token = process.env.TOKEN;
  const apiUrl = "https://api.clashofclans.com/v1";

  try {
    const membersResponse = await axios.get(
      `${apiUrl}/clans/${encodeURIComponent(clanId)}/members`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    const members = membersResponse.data.items.map((member: any) => ({
      id: member.tag,
      name: member.name,
    }));

    const raidSeasonResponse = await axios.get(
      `${apiUrl}/clans/${encodeURIComponent(
        clanId
      )}/capitalraidseasons?limit=2`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    const latestRaidSeason = raidSeasonResponse.data.items
      .filter((season: any) => season.state === "ended")
      .reduce((latest: any, season: any) => {
        if (!latest || season.endTime > latest.endTime) {
          return season;
        }
        return latest;
      }, null);

    if (!latestRaidSeason) {
      throw new Error("No ended raid seasons found.");
    }

    const participatedMembers =
      latestRaidSeason.members?.map((member: any) => ({
        id: member.tag,
        name: member.name,
      })) || [];

    const inactiveMembers = members.filter(
      (member: any) => !participatedMembers.some((p: any) => p.id === member.id)
    );
    
    return inactiveMembers;
  } catch (error) {
    console.error("Error filtering inactive players:", error);
    throw error;
  }
};
