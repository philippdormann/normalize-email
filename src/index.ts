const PLUS_ONLY = /\+.*$/;
const PLUS_AND_DOT = /\.|\+.*$/g;
const normalizeableProviders = {
  "gmail.com": {
    cut: PLUS_AND_DOT,
  },
  "googlemail.com": {
    cut: PLUS_AND_DOT,
    aliasOf: "gmail.com",
  },
  "hotmail.com": {
    cut: PLUS_ONLY,
  },
  "live.com": {
    cut: PLUS_AND_DOT,
  },
  "outlook.com": {
    cut: PLUS_ONLY,
  },
};

export function normalizeEmail(email: string) {
  if (typeof email != "string") {
    throw new TypeError("normalize-email expects a string");
  }

  email = email.toLowerCase();
  const emailParts = email.split(/@/);

  if (emailParts.length !== 2) {
    return email;
  }

  let username = emailParts[0];
  let domain = emailParts[1];

  if (normalizeableProviders.hasOwnProperty(domain)) {
    if (normalizeableProviders[domain].hasOwnProperty("cut")) {
      username = username.replace(normalizeableProviders[domain].cut, "");
    }
    if (normalizeableProviders[domain].hasOwnProperty("aliasOf")) {
      domain = normalizeableProviders[domain].aliasOf;
    }
  }

  return username + "@" + domain;
}
