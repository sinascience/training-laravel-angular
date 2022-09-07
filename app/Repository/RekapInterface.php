<?php 
namespace App\Repository;

Interface RekapInterface
{
    public function getAll(array $filter, int $itemPerPage, string $sort): object;

    public function getById(int $id): object;
}