<?php 
namespace App\Repository;

Interface ModelRekapInterface
{
    public function getAll(array $filter, int $itemPerPage, string $sort): object;

    public function getById(int $id): object;
}