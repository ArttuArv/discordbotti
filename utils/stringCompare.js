
const stringSimilarityInPercents = (string1, string2) => {

  const distance = levenshteinDistance(string1, string2)

  const maxLength = Math.max(string1.length, string2.length)
  const similarityPercentage = ((maxLength - distance) / maxLength) * 100

  return similarityPercentage.toFixed(2)
}

module.exports = {
  stringSimilarityInPercents
}

const levenshteinDistance = (string1, string2) => {
  const m = string1.length
  const n = string2.length
  const dp = []

  // Initialize the DP table
  for (let i = 0; i <= m; i++) {
    dp[i] = [i];
  }
  for (let j = 1; j <= n; j++) {
    dp[0][j] = j;
  }

  // Compute the DP table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = string1[i - 1] === string2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1, // deletion
        dp[i][j - 1] + 1, // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }

  // Return the final distance
  return dp[m][n];
}