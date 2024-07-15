export const REGEX = {
  discord: /^(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|com)\/|discordapp\.com\/invite\/)([a-zA-Z0-9-]{2,32})$/,
  twitterOrX: /^(https?:\/\/)?(www\.)?x\.com\/([a-zA-Z0-9_]{1,15})$|^(https?:\/\/)?(www\.)?twitter\.com\/(#!\/)?[a-zA-Z0-9_]{1,15}(\/\w+)*$/,
  instagram: /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_]+$/,
  facebook: /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9_]+$/,
  twitch: /^https?:\/\/(www\.)?twitch\.tv\/[a-zA-Z0-9_]+$/,
  youtube: /^https?:\/\/(www\.)?youtube\.com\/[a-zA-Z0-9_]+$/,
  tiktok: /^(?:https?:\/\/)?(?:www\.)?tiktok\.com\/(?:@\w{2,32}(?:\/video\/\d+)?)?(?:\?lang=\w{2})?$/i,
  steam: /^(https?:\/\/)?(www\.)?steamcommunity\.com\/(id|profiles)\/([0-9]{17,25})$/
}
