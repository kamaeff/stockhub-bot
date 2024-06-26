import {InlineKeyboardMarkup} from 'node-telegram-bot-api'
import {getProfile} from './db'

async function push_profile(
  bot: any,
  username: string,
  chatId: number,
  messageId: number,
) {
  const info = await getProfile(chatId.toString())

  if (info) {
    await bot.editMessageText(
      `📈 <b>Вот твоя стата ${username}:</b>\n\n` +
        `● <b>ФИО:</b> <i>${
          info.fio === 'none' ? ` 🚫 <i><b>Не заполнено!</b></i>` : info.fio
        }</i>\n` +
        `● <b>Всего заказов сделано:</b> <i>${info.orders}</i>\n` +
        `● <b>Бонусы:</b> <i>${info.bonus}</i>\n` +
        `● <b>Адрес доставки:</b> <i>${
          info.locale === 'none'
            ? ` 🚫 <i><b>Не заполнено!</b></i>`
            : info.locale
        }</i>\n` +
        `● <b>Email:</b> <i>${
          info.email === 'none' ? ` 🚫 <i><b>Не заполнено!</b></i>` : info.email
        }</i>\n\n` +
        `<i><b>P.S</b> Email, Адрес ПВЗ и ФИО нужны для формирования заказа</i>\n\n` +
        `<i>Доставка по Москве возможна нашим курьром. Стоимость доставки в пределах МКАД составит 500 рублей, за пределами МКАД 800 рублей.</i>\n` +
        `<i>Также возможна доставка в ПВЗ Боксберри.</i>`,
      {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: '⏳ История заказов',
                callback_data: 'data_orders',
              },
            ],
            [
              {
                text:
                  info.locale !== 'none'
                    ? '📦 Обновить адрес'
                    : '📦 Заполнить адрес',
                callback_data: 'locale',
              },
            ],
            [
              {
                text:
                  info.email !== 'none'
                    ? '✉️ Поменять email'
                    : '✉️  Заполнить email',
                callback_data: 'email',
              },
              {
                text:
                  info.fio !== 'none' ? '👤 Поменять ФИО' : '👤 Заполнить ФИО',
                callback_data: 'fio',
              },
            ],
            [],
            [
              {
                text: '🏠 Главное меню',
                callback_data: 'main_menu',
              },
            ],
          ],
        } as InlineKeyboardMarkup,
      },
    )
  } else {
    console.log('User profile not found.')
    return false
  }
}

export {push_profile}
