// Инициализация данных для теста
const warrior = new window.Hero('1', 'воин', { hp: 100, attack: 20, defence: 5, speed: 15 }, 'warrior');

warrior.addToInventory(
    new Consumable('consumable_hp_small', 'Малое зелье здоровья', 'common', 5, 'heal', 30, '💗')
);

warrior.addToInventory(
    new Weapon('weapon_sword_1', 'Деревянный меч', 'common', 10, { damage: 5, range: 1 }, '⚔️')
);

window.GameState.heroes.push(warrior);

// Запуск UI
const ui = new UIManager();
// +++ НОВОЕ: создаём контроллер арены
const arenaController = new window.ArenaController();


window.GameState.selectHero(1);
window.GameState.initShop();
// Инициализируем магазин
window.GameState.initShop();

// +++ НОВОЕ: инициализируем систему крафта
window.GameState.initRecipes();

// Обработчики кнопок локаций
document.querySelectorAll('.start-match-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const location = e.target.closest('.location-card').dataset.location;
        const costType = e.target.dataset.costType;

        const hero = window.GameState.getCurrentHero();

        if (!hero) {
            alert('Сначала выберите героя в меню "Герои"!');
            return;
        }

        if (window.GameState.resources[costType] < 1) {
            alert(`Не хватает ${costType}!`);
            return;
        }

        // Тратим ресурс
        window.GameState.updateResource(costType, -1);

        // +++ НОВОЕ: начинаем вылазку на арену
        const started = arenaController.startExpedition(location, hero);

        if (!started) {
            // Возвращаем ресурс, если не удалось начать
            window.GameState.updateResource(costType, 1);
        }
    });
});
        if (!started) {
            // Возвращаем ресурс, если не удалось начать
            window.GameState.updateResource(costType, 1);
        }

        // Даем опыт за матч (увеличили до 15)
        const currentHero = window.GameState.getCurrentHero();
        currentHero.addExp(15);

        // +++ НОВОЕ: добавляем награды (материалы и возможные рецепты)
        const rewards = window.GameState.addBattleRewards();

        let message = `Матч завершен! Герой ${currentHero.name} получил 15 опыта.\n`;
        message += `Получены материалы: ${rewards.materials.map(m => m.amount > 0 ? `${m.type.replace('material_', '')}: ${m.amount}` : '').filter(Boolean).join(', ')}`;

        if (rewards.newRecipe) {
            message += `\n🔓 Открыт новый рецепт: ${rewards.newRecipe.name}!`;
        }

        alert(message);

    });
});
console.log('Игра запущена! Магазин и крафт инициализированы.');

