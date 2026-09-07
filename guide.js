document.addEventListener('DOMContentLoaded', async function () {
    const page = document.body;
    const sectionId = page.dataset.guideSection;
    const content = document.getElementById('guideContent');

    if (!sectionId || !content) return;

    document.querySelector('.nav-dropdown[open]')?.removeAttribute('open');

    try {
        const response = await fetch('goalkeeper.html');
        if (!response.ok) throw new Error('Rehber içeriği yüklenemedi.');

        const source = new DOMParser().parseFromString(await response.text(), 'text/html');
        const section = source.getElementById(sectionId);
        if (!section) throw new Error('İstenen rehber bölümü bulunamadı.');

        content.replaceChildren(section);
    } catch (error) {
        content.innerHTML = '<p class="guide-error">Bu rehber şu an yüklenemedi. Lütfen ana sayfadan tekrar deneyin.</p>';
        console.error(error);
    }
});
