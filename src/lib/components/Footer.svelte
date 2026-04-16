<script lang="ts">
    const year = new Date().getFullYear();
</script>

<footer
    class="flex justify-between bg-[color:var(--background-container)] text-[color:var(--text-secondary)] select-none text-sm mt-auto px-4 py-2"
>
    <span>© {year} WarperSan. All rights reserved.</span>
    <nav class="flex gap-4 text-base">
        <a
            href="https://discord.com/users/457981279485427724"
            target="_blank"
            aria-label="Discord"
            title="Discord"
        >
            <i class="fa-brands fa-discord"></i>
        </a>
        <a
            href="https://github.com/WarperSan"
            target="_blank"
            aria-label="GitHub"
            title="GitHub"
        >
            <i class="devicon-github-plain"></i>
        </a>
    </nav>
</footer>
