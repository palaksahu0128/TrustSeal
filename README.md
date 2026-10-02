# TrustSeal
Cryptographic proof that a message really came from who it claims to.

## Problem
Impersonation scams work because nobody can verify who is really contacting them. Spam filters only guess from patterns.

## Solution
Organizations register a cryptographic identity on a blockchain registry. Their messages carry a signed seal (QR/code). Users verify it in seconds and get one of three results: Verified, Revoked, or Unsealed.

## Tech Stack
React, Node.js + Express, Ed25519 signatures, Solidity (Polygon Amoy testnet), ethers.js, PostgreSQL

## Status
Concept submitted for HackSprint 2K26 (Web3 & Cybersecurity track). Code will be added as it is built.
