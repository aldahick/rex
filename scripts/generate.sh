#!/bin/bash
set -e

cd api && pnpm generate && cd ..
cd web && pnpm generate && cd ..
