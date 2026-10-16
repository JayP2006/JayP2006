# Install the Dynamic JayP2006 GitHub Profile

This pack deliberately contains **no handcrafted static banner or screenshot images**. The profile's visuals are rendered by live SVG services or generated from your GitHub activity by scheduled GitHub Actions.

## 1. Copy the files

1. Open your profile repository: <https://github.com/JayP2006/JayP2006>.
2. Extract this ZIP.
3. Copy `README.md`, `.github/workflows/snake.yml`, and `.github/workflows/metrics.yml` into the root of that repository, preserving the `.github/workflows` directory structure.
4. Commit and push the files to the repository's default branch.

If the repository's default branch is not the one the Actions tab shows by default, open Actions and run the workflows from the default branch.

## 2. Enable the animated contribution snake

1. Open **Actions → Refresh Contribution Animation**.
2. Select **Run workflow**.
3. Wait for the run to succeed. It will create `github-snake.svg` and `github-snake-dark.svg` at the repository root.
4. The workflow then refreshes the animation daily.

The workflow uses `GITHUB_TOKEN` and requires repository Actions permissions that allow it to write contents. In **Settings → Actions → General**, choose read/write workflow permissions if the run cannot commit generated files.

## 3. Enable the deeper metrics dashboard

The Metrics project needs a personal access token to read account-level profile activity that a repository-scoped `GITHUB_TOKEN` cannot retrieve. The workflow is included but requires this one-time secret:

1. In GitHub, open **Settings → Developer settings → Personal access tokens**.
2. Create a token with the minimum permissions needed for the public data you want to display. For public-only profile metrics, no additional classic-token scopes are normally required; avoid granting private repository access unless you specifically need it.
3. In `JayP2006/JayP2006`, open **Settings → Secrets and variables → Actions → New repository secret**.
4. Set the secret name to `METRICS_TOKEN` and paste the token as its value.
5. Open **Actions → Refresh GitHub Metrics → Run workflow**.
6. When successful, the workflow creates `github-metrics.svg`. The panel inside the README's expandable **daily metrics layer** will then render and refresh daily.

Do not put the token in `README.md`, workflow YAML, or any committed file.


## 4. Publish the interactive Jay Systems mini-site

The `site/` directory is a real HTML/CSS/JavaScript experience, not a screenshot. It includes a command palette (`Ctrl+K`), theme toggle, animated role text and orbit visuals, scroll-reveal transitions, a searchable/sortable repository browser, and GitHub API-powered account signals.

1. Open **Settings → Pages** in `JayP2006/JayP2006`.
2. Under **Build and deployment**, select **GitHub Actions** as the source.
3. Open **Actions → Deploy Jay Systems Site → Run workflow**.
4. If the default branch is named `master` rather than `main`, either run the workflow manually or change the `branches: [main]` filter in `.github/workflows/pages.yml` to `branches: [master]`.
5. After deployment, the site should be available at <https://jayp2006.github.io/JayP2006/>.

The site's repository explorer uses GitHub's unauthenticated public REST API and can be temporarily rate-limited. The rest of the site remains usable if that API call fails.

## 5. Important GitHub README limitation

GitHub README files don't execute arbitrary JavaScript or user-defined CSS. That means a README cannot host a fully custom React/Vue dashboard inside GitHub itself. This design uses supported HTML tables, native expandable `<details>` sections, animated remote SVGs, live stats services, and scheduled automation to make the profile feel dynamic while remaining a normal GitHub README.

## 6. Optional clean-up

After the first successful snake run and (if enabled) metrics run, refresh the profile page. If a third-party stats service is unavailable or rate-limits requests, its widget may temporarily fail; the surrounding README and other widgets will still render.
