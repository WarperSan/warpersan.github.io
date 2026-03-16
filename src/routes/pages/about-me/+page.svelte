<svelte:head>
    <title>About Me</title>
    <link href="/styles/skills.css" rel="stylesheet">
    <script defer src="/scripts/elements/SkillElement.js"></script>
    <link href="/styles/contact.css" rel="stylesheet">
</svelte:head>

<article>
    <section>
        <h2 id="about-me">About me</h2>
        <p>
            Hi, I'm WarperSan. I am a Canadian programmer that loves to mess around libraries. I
            specialize myself in game
            making, back-end web developement and library creation, mostly all written in C#. I try my best to keep my work both efficient and organized.
        </p>
    </section>
    <section>
        <h2 id="tools-and-skills">Skills</h2>
        <p>
            You can see all the tools, languages and frameworks I use or once used.
        </p>
        <div id="skills-container">
            <div>
                <h3 title="All the languages I once used">Languages</h3>
                <div class="skills">
                    <skill-icon class="devicon-csharp-plain">C#</skill-icon>
                    <skill-icon class="devicon-php-plain">PHP</skill-icon>
                    <skill-icon class="devicon-javascript-plain">JavaScript</skill-icon>
                    <skill-icon class="devicon-haxe-plain">Haxe</skill-icon>
                    <skill-icon class="devicon-lua-plain">Lua</skill-icon>
                    <skill-icon class="devicon-typescript-plain">TypeScript</skill-icon>
                    <skill-icon class="devicon-java-plain">Java</skill-icon>
                    <skill-icon class="devicon-cplusplus-plain">C++</skill-icon>
                </div>
            </div>

            <div>
                <h3 title="All the scripting and markup languages I once used">Markup & Scripting</h3>
                <div class="skills">
                    <skill-icon class="devicon-html5-plain">HTML</skill-icon>
                    <skill-icon class="devicon-css3-plain">CSS</skill-icon>
                    <skill-icon class="devicon-bash-plain">Bash</skill-icon>
                    <skill-icon class="devicon-markdown-plain">Markdown</skill-icon>
                </div>
            </div>

            <div>
                <h3 title="All the frameworks I once used">Frameworks</h3>
                <div class="skills">
                    <skill-icon class="devicon-nodejs-plain">Node JS</skill-icon>
                    <skill-icon class="devicon-jquery-plain">JQuery</skill-icon>
                    <skill-icon class="devicon-react-plain">React</skill-icon>
                    <skill-icon class="devicon-codeigniter-plain">CodeIgniter</skill-icon>
                </div>
            </div>

            <div>
                <h3 title="All the databases I once used">Databases</h3>
                <div class="skills">
                    <skill-icon class="devicon-azuresqldatabase-plain">SQL</skill-icon>
                    <skill-icon class="devicon-mongodb-plain">MongoDB</skill-icon>
                </div>
            </div>

            <div>
                <h3 title="All the IDEs I once used">IDEs</h3>
                <div class="skills">
                    <skill-icon class="devicon-rider-plain">Rider</skill-icon>
                    <skill-icon class="devicon-webstorm-plain">WebStorm</skill-icon>
                    <skill-icon class="devicon-vscode-plain">VS Code</skill-icon>
                    <skill-icon class="devicon-visualstudio-plain">Visual Studio</skill-icon>
                    <skill-icon class="devicon-androidstudio-plain">Android Studio</skill-icon>
                </div>
            </div>

            <div>
                <h3 title="All the tools I once used">Tools</h3>
                <div class="skills">
                    <skill-icon class="devicon-github-plain">GitHub</skill-icon>
                    <skill-icon class="devicon-git-plain">Git</skill-icon>
                </div>
            </div>

            <div>
                <h3 title="All operating systems I once used">Operating Systems</h3>
                <div class="skills">
                    <skill-icon class="devicon-windows11-plain">Windows 11</skill-icon>
                    <skill-icon class="devicon-linux-plain">Linux</skill-icon>
                    <skill-icon class="devicon-ubuntu-plain">Ubuntu</skill-icon>
                </div>
            </div>

            <div>
                <h3 title="All development and collaboration tools I once used">Dev Tools & Collaboration</h3>
                <div class="skills">
                    <skill-icon class="devicon-docker-plain">Docker</skill-icon>
                    <skill-icon class="devicon-jira-plain">Jira</skill-icon>
                    <skill-icon class="devicon-slack-plain">Slack</skill-icon>
                    <skill-icon class="devicon-sonarqube-plain">SonarQube</skill-icon>
                    <skill-icon class="devicon-swagger-plain">Swagger</skill-icon>
                </div>
            </div>

            <div>
                <h3 title="All I once used in my personal work">Personal Use</h3>
                <div class="skills">
                    <skill-icon class="devicon-unity-plain">Unity</skill-icon>
                </div>
            </div>
        </div>
    </section>
    <section>
        <h2 id="contact-me">Contact me</h2>
        <p>You can contact me through the following means:</p>
        <div id="contact-container">
            <a href="https://discord.com/users/457981279485427724" target="_blank" aria-label="Discord">
                <i class="fa-brands fa-discord"></i>
            </a>
            <a href="https://github.com/WarperSan" target="_blank" aria-label="GitHub">
                <i class="devicon-github-plain"></i>
            </a>
            <a href="https://youtube.com/@WarperSan" target="_blank" aria-label="Youtube">
                <i class="fa-brands fa-youtube"></i>
            </a>
        </div>
    </section>
</article>