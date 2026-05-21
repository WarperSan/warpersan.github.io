<script lang="ts">
    interface Props {
        title: string;
        description: string;
        href: string;
        cover?: string;
    }

    let { title, description, href, cover }: Props = $props();
</script>

<a
    class="flex flex-col overflow-hidden bg-[var(--background-body)] border-[color:var(--border-input)] no-underline transition-all duration-[var(--transition-delay)] ease-[ease-in-out] rounded-2xl border-2 border-solid select-none hover:-translate-y-1 focus:-translate-y-1 hover:shadow-[0_15px_25px_-5px_var(--border-input)] focus:shadow-[0_15px_25px_-5px_var(--border-input)] hover:border-[color:var(--hover-border)] focus:border-[color:var(--hover-border)]"
    {href}
    target="_blank"
>
    <div class="flex h-3/5">
        <img
            src={cover}
            alt="Cover of '{title}'"
            class="w-full h-full object-cover content-center text-center"
        />
    </div>
    <div class="flex-1 bg-[color:var(--background-input)] p-4">
        <h3 class="m-0">{title}</h3>
        <span class="text-[color:var(--text-secondary)]">{description}</span>
    </div>
</a>
