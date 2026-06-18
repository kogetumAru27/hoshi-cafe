import { PrismaClient } from "../app/generated/prisma/client/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";
dotenv.config();

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
    await prisma.menu.createMany({
        data: [
            { name: "ブレンドコーヒー", price: 480, description: "深みのある香りのオリジナルブレンド", category: "COFFEE" },
            { name: "カフェラテ", price: 550, description: "まろやかなミルクとエスプレッソの組み合わせ", category: "COFFEE" },
            { name: "カプチーノ", price: 550, description: "ふわふわの泡が特徴のイタリアン定番", category: "COFFEE" },
            { name: "抹茶ラテ", price: 580, description: "国産抹茶を使った濃厚なラテ", category: "TEA" },
            { name: "ほうじ茶", price: 450, description: "香ばしい風味のほうじ茶", category: "TEA" },
            { name: "アールグレイ", price: 480, description: "ベルガモットの香りが上品な紅茶", category: "TEA" },
            { name: "チーズケーキ", price: 620, description: "濃厚でなめらかなニューヨークスタイル", category: "DESSERT" },
            { name: "プリン", price: 520, description: "昔ながらのかためのカスタードプリン", category: "DESSERT" },
            { name: "トースト", price: 380, description: "バターたっぷりの厚切りトースト", category: "MEAL" },
            { name: "パスタ", price: 880, description: "日替わりソースのランチパスタ", category: "MEAL" },
        ]
    });
    await prisma.constellation.createMany({
        data: [
            { name: "オリオン座", description: "冬を代表する星座。三ツ星が目印。", season: "WINTER", magnitude: 0.1, shape: "狩人の形" },
            { name: "ふたご座", description: "カストルとポルックスの二つの星が目印。", season: "WINTER", magnitude: 1.1, shape: "双子の形" },
            { name: "おおいぬ座", description: "全天で最も明るいシリウスを持つ星座。", season: "WINTER", magnitude: -1.4, shape: "犬の形" },
            { name: "しし座", description: "春の空に輝く黄道十二星座の一つ。", season: "SPRING", magnitude: 1.3, shape: "ライオンの形" },
            { name: "おとめ座", description: "春の南の空に見える大きな星座。スピカが目印。", season: "SPRING", magnitude: 0.9, shape: "乙女の形" },
            { name: "さそり座", description: "夏の南の空に見える。アンタレスが目印。", season: "SUMMER", magnitude: 0.9, shape: "さそりの形" },
            { name: "はくちょう座", description: "夏の大三角を形成する星座。", season: "SUMMER", magnitude: 1.2, shape: "十字の形" },
            { name: "ペガスス座", description: "秋の四辺形が目印の大きな星座。", season: "AUTUMN", magnitude: 2.4, shape: "馬の形" },
            { name: "アンドロメダ座", description: "アンドロメダ銀河が見える秋の星座。", season: "AUTUMN", magnitude: 2.0, shape: "鎖につながれた女性の形" },
        ]
    });
    console.log("完了");
}

main();