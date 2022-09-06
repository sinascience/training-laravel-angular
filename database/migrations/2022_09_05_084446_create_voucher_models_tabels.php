<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVoucherModelsTabels extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('m_voucher', function (Blueprint $table) {
            $table->id();
            $table->integer('m_promo_id');
            $table->integer('id_customer');
            $table->integer('jumlah')->nullable();
            $table->boolean('status')->default(1);

            $table->timestamps();
            $table->softDeletes(); // Generate deleted_at
            $table->integer('created_by')->default(0);
            $table->integer('updated_by')->default(0);
            $table->integer('deleted_by')->default(0);

            $table->index('m_promo_id');
            $table->index('id_customer');
            $table->index('jumlah');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('m_voucher');
    }
}
